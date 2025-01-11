# Setup Handleiding

## Docker Ontwikkelomgeving

### Vereisten
- Docker Desktop geïnstalleerd
- Git geïnstalleerd
- Node.js geïnstalleerd (voor lokale ontwikkeling buiten Docker)

### Stap 1: Repository klonen
```bash
git clone https://github.com/yourusername/ai-seo-sea-automation-tool.git
cd ai-seo-sea-automation-tool
```

### Stap 2: Environment variabelen instellen
1. Kopieer het `.env.example` bestand naar `.env`:
```bash
cp .env.example .env
```

2. Vul de benodigde environment variabelen in:
```env
# Database configuratie
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/ai_seo_sea_db"
MONGODB_URL="mongodb://mongodb:27017"
MONGODB_DB_NAME="ai_seo_sea_analytics"
REDIS_URL="redis://redis:6379"

# OAuth configuratie
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OAUTH_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"
```

### Stap 3: Docker containers starten
```bash
# Start alle services
docker-compose up -d

# Start alleen specifieke services
docker-compose up -d frontend backend

# Start monitoring stack (optioneel)
docker-compose -f docker-compose.monitoring.yml up -d
```

### Stap 4: Database migraties uitvoeren
```bash
# Voer Prisma migraties uit
docker-compose exec backend npx prisma migrate dev
```

### Stap 5: Applicatie gebruiken
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Monitoring:
  - Grafana: http://localhost:3000
  - Prometheus: http://localhost:9090

### Handige Docker commando's
```bash
# Bekijk logs
docker-compose logs -f frontend  # Frontend logs
docker-compose logs -f backend   # Backend logs

# Stop containers
docker-compose down

# Herstart een service
docker-compose restart frontend
docker-compose restart backend

# Rebuild containers na wijzigingen in Dockerfile
docker-compose up -d --build
```

### Ontwikkeling
- Frontend code bevindt zich in de `frontend` map
- Backend code bevindt zich in de `backend` map
- Hot-reloading is ingeschakeld voor zowel frontend als backend
- Wijzigingen in de code worden automatisch gedetecteerd en toegepast

### Troubleshooting
1. Als containers niet starten:
   - Controleer of alle poorten beschikbaar zijn
   - Controleer Docker logs voor specifieke errors
   
2. Bij database connectie problemen:
   - Wacht 30 seconden tot de databases volledig zijn opgestart
   - Controleer de database credentials in `.env`

3. Bij volume permission errors:
   - Zorg dat je de juiste rechten hebt op de project directory
   - Probeer de containers te rebuilden met `docker-compose up -d --build`
