# Installatie & Setup Handleiding
# Installation & Setup Guide

[Nederlands](#installatie--setup) | [English](#installation--setup)

## Installatie & Setup

### Systeemvereisten
- Docker Desktop
- Git
- Node.js (voor lokale ontwikkeling buiten Docker)
- Minimaal 8GB RAM
- 20GB vrije schijfruimte

### Stap 1: Repository Klonen
```bash
git clone https://github.com/yourusername/ai-seo-sea-automation-tool.git
cd ai-seo-sea-automation-tool
```

### Stap 2: Environment Variabelen Instellen
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

# API Keys
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_SEARCH_API_KEY="your-google-search-api-key"
SEMRUSH_API_KEY="your-semrush-api-key"
```

### Stap 3: Docker Containers Starten
```bash
# Start alle services
docker-compose up -d

# Start alleen specifieke services
docker-compose up -d frontend backend

# Start monitoring stack (optioneel)
docker-compose -f docker-compose.monitoring.yml up -d
```

### Stap 4: Database Migraties Uitvoeren
```bash
# Voer Prisma migraties uit
docker-compose exec backend npx prisma migrate dev
```

### Stap 5: Applicatie Gebruiken
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Monitoring:
  - Grafana: http://localhost:3000
  - Prometheus: http://localhost:9090

### Handige Docker Commando's
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

3. Bij API problemen:
   - Verifieer dat alle API keys geldig zijn
   - Controleer de rate limits van externe services

## Installation & Setup

### System Requirements
- Docker Desktop
- Git
- Node.js (for local development outside Docker)
- Minimum 8GB RAM
- 20GB free disk space

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/ai-seo-sea-automation-tool.git
cd ai-seo-sea-automation-tool
```

### Step 2: Set Environment Variables
1. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

2. Fill in the required environment variables:
```env
# Database configuration
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/ai_seo_sea_db"
MONGODB_URL="mongodb://mongodb:27017"
MONGODB_DB_NAME="ai_seo_sea_analytics"
REDIS_URL="redis://redis:6379"

# OAuth configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OAUTH_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"

# API Keys
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_SEARCH_API_KEY="your-google-search-api-key"
SEMRUSH_API_KEY="your-semrush-api-key"
```

### Step 3: Start Docker Containers
```bash
# Start all services
docker-compose up -d

# Start specific services only
docker-compose up -d frontend backend

# Start monitoring stack (optional)
docker-compose -f docker-compose.monitoring.yml up -d
```

### Step 4: Run Database Migrations
```bash
# Run Prisma migrations
docker-compose exec backend npx prisma migrate dev
```

### Step 5: Use Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Monitoring:
  - Grafana: http://localhost:3000
  - Prometheus: http://localhost:9090

### Useful Docker Commands
```bash
# View logs
docker-compose logs -f frontend  # Frontend logs
docker-compose logs -f backend   # Backend logs

# Stop containers
docker-compose down

# Restart a service
docker-compose restart frontend
docker-compose restart backend

# Rebuild containers after Dockerfile changes
docker-compose up -d --build
```

### Development
- Frontend code is located in the `frontend` directory
- Backend code is located in the `backend` directory
- Hot-reloading is enabled for both frontend and backend
- Code changes are automatically detected and applied

### Troubleshooting
1. If containers don't start:
   - Check if all ports are available
   - Check Docker logs for specific errors
   
2. Database connection issues:
   - Wait 30 seconds for databases to fully start
   - Verify database credentials in `.env`

3. API issues:
   - Verify all API keys are valid
   - Check rate limits of external services
