# Setup Handleiding

## Technische Stack

### Frontend
- Next.js (React framework voor SSR en optimale SEO)
- TypeScript (voor type-veiligheid)
- Tailwind CSS (voor styling)
- Redux Toolkit (state management)
- PWA capabilities

### Backend
- Node.js met Express
- TypeScript
- PostgreSQL (primaire database)
- Redis (caching)
- Jest (testing)

### DevOps
- Docker (containerization)
- GitHub Actions (CI/CD)
- Vercel (hosting frontend)
- DigitalOcean (hosting backend)

## Vereisten
- Node.js 18+
- Docker
- PostgreSQL 14+
- Redis 6+

## Beveiliging & Configuratie

### 1. Environment Variables
Maak een `.env` bestand aan in zowel de frontend als backend directory. Gebruik de `.env.example` bestanden als template.

#### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
# Voeg NOOIT geheime keys toe aan frontend environment variables
```

#### Backend (.env):
```
# Server Configuration
PORT=3001
NODE_ENV=development
API_VERSION=v1

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/seo_tool
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRATION=24h
REFRESH_TOKEN_SECRET=your-secure-refresh-token
REFRESH_TOKEN_EXPIRATION=7d

# API Keys (Gebruik sterke, unieke keys in productie)
GOOGLE_ADS_API_KEY=
AHREFS_API_KEY=
SEMRUSH_API_KEY=

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100

# Email Service
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### 2. API Key Management
- Gebruik nooit API keys direct in de code
- Sla API keys veilig op in environment variables
- Roteer API keys regelmatig
- Implementeer key versioning voor smooth transitions
- Monitor API key usage voor security alerts

### 3. Beveiligingsrichtlijnen
- Implementeer rate limiting per endpoint
- Gebruik HTTPS voor alle verbindingen
- Implementeer proper CORS policies
- Valideer alle user input
- Implementeer proper error handling
- Log security events voor monitoring
- Scan dependencies regelmatig op vulnerabilities
- Gebruik prepared statements voor database queries
- Implementeer proper session management
- Gebruik secure headers (Helmet)
- Implementeer CSP policies

## Lokale Ontwikkelomgeving

### 1. Repository Klonen
```bash
git clone https://github.com/[username]/ai-seo-sea-automation-tool.git
cd ai-seo-sea-automation-tool
```

### 2. Dependencies Installeren
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Databases Opzetten
```bash
# PostgreSQL database aanmaken
createdb seo_tool

# Redis server starten
redis-server
```

### 4. Development Servers Starten
```bash
# Frontend development server
cd frontend
npm run dev

# Backend development server
cd ../backend
npm run dev
```

## Productie Deployment

### 1. Frontend (Vercel)
- Push changes naar main branch
- Vercel zal automatisch deployen
- Controleer build logs voor errors
- Verifieer deployment success

### 2. Backend (DigitalOcean)
- Push changes naar main branch
- GitHub Actions triggert deployment
- Controleer deployment status
- Monitor server health

### 3. Database Migraties
```bash
# Run database migraties
npm run migrate
```

## Monitoring & Logging
- Gebruik logging voor debugging
- Monitor server resources
- Track API performance
- Monitor database queries
- Check security logs
