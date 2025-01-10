#!/bin/bash

# Configuratie
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-seosea}
DB_USER=${DB_USER:-postgres}
BACKUP_BUCKET=${BACKUP_BUCKET:-seo-sea-backups}
BACKUP_PATH=${BACKUP_PATH:-database-backups}

# Functies voor logging
log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') - $1" >&2
}

# Controleer vereiste tools
check_requirements() {
    local required_tools=("aws" "psql" "pg_restore" "gunzip")
    
    for tool in "${required_tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            log_error "$tool is niet geïnstalleerd"
            exit 1
        fi
    done
}

# Lijst beschikbare backups
list_backups() {
    log_info "Beschikbare backups ophalen..."
    aws s3 ls "s3://$BACKUP_BUCKET/$BACKUP_PATH/" | sort -r
}

# Download specifieke backup
download_backup() {
    local backup_file=$1
    local temp_dir=$(mktemp -d)
    
    log_info "Backup downloaden: $backup_file"
    aws s3 cp "s3://$BACKUP_BUCKET/$BACKUP_PATH/$backup_file" "$temp_dir/$backup_file"
    
    echo "$temp_dir/$backup_file"
}

# Herstel database
restore_database() {
    local backup_file=$1
    
    log_info "Database herstellen vanaf: $backup_file"
    
    # Stop de applicatie
    log_info "Applicatie stoppen..."
    kubectl scale deployment seo-sea-backend --replicas=0 -n production
    
    # Wacht tot alle pods gestopt zijn
    while kubectl get pods -n production -l app=seo-sea-backend 2>/dev/null | grep -q Running; do
        log_info "Wachten tot alle pods gestopt zijn..."
        sleep 5
    done
    
    # Herstel de database
    log_info "Database herstellen..."
    if [[ "$backup_file" == *.gz ]]; then
        gunzip -c "$backup_file" | PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME"
    else
        PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" < "$backup_file"
    fi
    
    # Start de applicatie weer
    log_info "Applicatie herstarten..."
    kubectl scale deployment seo-sea-backend --replicas=3 -n production
    
    # Wacht tot alle pods weer draaien
    while [[ $(kubectl get pods -n production -l app=seo-sea-backend -o jsonpath='{.items[*].status.phase}' | tr ' ' '\n' | grep -c Running) -lt 3 ]]; do
        log_info "Wachten tot alle pods weer draaien..."
        sleep 5
    done
}

# Hoofdscript
main() {
    check_requirements
    
    # Toon beschikbare backups
    echo "Beschikbare backups:"
    list_backups
    
    # Vraag welke backup hersteld moet worden
    read -p "Voer de naam van de backup in die je wilt herstellen: " backup_name
    
    if [ -z "$backup_name" ]; then
        log_error "Geen backup naam opgegeven"
        exit 1
    fi
    
    # Download en herstel de backup
    local backup_file=$(download_backup "$backup_name")
    
    if [ ! -f "$backup_file" ]; then
        log_error "Backup bestand niet gevonden"
        exit 1
    fi
    
    # Vraag om bevestiging
    read -p "Weet je zeker dat je de database wilt herstellen? Dit overschrijft alle huidige data! (ja/nee): " confirm
    
    if [ "$confirm" != "ja" ]; then
        log_info "Herstel geannuleerd"
        exit 0
    fi
    
    # Voer het herstel uit
    restore_database "$backup_file"
    
    # Ruim tijdelijke bestanden op
    rm -f "$backup_file"
    
    log_info "Database herstel succesvol afgerond"
}

# Start het script
main "$@"
