# PostgreSQL Installatie en Setup Guide

## 1. PostgreSQL Installatie

### Download
1. Ga naar [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
2. Download de laatste versie van PostgreSQL voor Windows
3. Kies de 64-bit versie die overeenkomt met je Windows-versie

### Installatie Stappen
1. Start het gedownloade installatiebestand
2. Kies de componenten (laat alles aangevinkt):
   - PostgreSQL Server
   - pgAdmin 4
   - Command Line Tools
   - Stack Builder
3. Kies installatielocatie (standaard is prima)
4. Kies data directory (standaard is prima)
5. Stel het wachtwoord in voor de database superuser (postgres)
   - **Bewaar dit wachtwoord goed!**
6. Kies de poort (standaard 5432)
7. Kies de locale (standaard is prima)
8. Voltooi de installatie

## 2. Database Setup

### Via pgAdmin 4
1. Open pgAdmin 4
2. Log in met het masterwachtwoord dat je tijdens de installatie hebt ingesteld
3. Rechtsklik op 'Databases' onder je server
4. Kies 'Create' > 'Database'
5. Vul in:
   - Database: `ai_seo_sea_db`
   - Owner: `postgres`
6. Klik op 'Save'

### Via Command Line
1. Open Command Prompt als administrator
2. Log in op PostgreSQL:
   ```bash
   psql -U postgres
   ```
3. Voer je wachtwoord in
4. Maak de database aan:
   ```sql
   CREATE DATABASE ai_seo_sea_db;
   ```
5. Controleer of de database is aangemaakt:
   ```sql
   \l
   ```

## 3. Environment Setup

1. Update je `.env` bestand in de backend map:
   ```env
   DATABASE_URL="postgresql://postgres:JouwWachtwoord@localhost:5432/ai_seo_sea_db"
   ```
   Vervang 'JouwWachtwoord' met het wachtwoord dat je tijdens de installatie hebt ingesteld.

## 4. Database Migraties

Na de installatie en setup, run de volgende commands in de backend directory:

```bash
# Genereer Prisma Client
npx prisma generate

# Maak en run de initiële migratie
npx prisma migrate dev --name initial
```

## 5. Verificatie

### Test de Connectie
1. Open pgAdmin 4
2. Ververs de databases lijst
3. Je zou `ai_seo_sea_db` moeten zien
4. Open de Query Tool en run:
   ```sql
   SELECT current_database(), current_user, version();
   ```

### Test via Applicatie
1. Start de backend server:
   ```bash
   npm run dev
   ```
2. Controleer de console op foutmeldingen
3. De server zou moeten starten zonder database-gerelateerde errors

## 6. Backup & Restore (Optioneel)

### Backup maken
```bash
pg_dump -U postgres -d ai_seo_sea_db > backup.sql
```

### Restore vanaf backup
```bash
psql -U postgres -d ai_seo_sea_db < backup.sql
```

## Troubleshooting

### Veel voorkomende problemen

1. **Kan niet verbinden met de database**
   - Controleer of PostgreSQL service draait
   - Verifieer poort 5432 niet geblokkeerd is
   - Check je `.env` bestand voor juiste credentials

2. **Permissie problemen**
   - Controleer database user rechten
   - Verifieer schema ownership
   - Check connection string in `.env`

3. **Poort al in gebruik**
   - Controleer of andere services poort 5432 gebruiken
   - Wijzig PostgreSQL poort indien nodig

### Handige Commands

```bash
# Check PostgreSQL status (Windows)
sc query postgresql

# Start PostgreSQL service
net start postgresql

# Stop PostgreSQL service
net stop postgresql

# Check PostgreSQL versie
psql --version

# PostgreSQL log locatie
C:\Program Files\PostgreSQL\[version]\data\log
```
