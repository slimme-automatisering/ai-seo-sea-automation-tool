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

## Lokale Ontwikkelomgeving Opzetten

### 1. Repository Klonen
```bash
git clone https://github.com/[username]/ai-seo-sea-automation-tool.git
cd ai-seo-sea-automation-tool
```

### 2. Environment Variables
Maak een `.env` bestand aan in zowel de frontend als backend directory:

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
```

Backend (.env):
```
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/seo_tool
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
GOOGLE_ADS_CLIENT_ID=your_client_id
```

### 3. Dependencies Installeren
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 4. Database Setup
```bash
# Start PostgreSQL en Redis via Docker
docker-compose up -d

# Run migrations
cd backend
npm run migrate
```

### 5. Development Servers Starten
```bash
# Frontend (http://localhost:3000)
cd frontend
npm run dev

# Backend (http://localhost:3001)
cd backend
npm run dev
```

## Productie Deployment

### Frontend (Vercel)
1. Fork de repository
2. Maak een nieuw project aan op Vercel
3. Verbind met de GitHub repository
4. Configureer environment variables
5. Deploy

### Backend (DigitalOcean)
1. Maak een nieuwe Droplet aan
2. Setup Docker en Docker Compose
3. Clone repository
4. Configureer environment variables
5. Run `docker-compose -f docker-compose.prod.yml up -d`

## Security Best Practices
- Gebruik HTTPS
- Implementeer rate limiting
- Sla wachtwoorden op met bcrypt
- Gebruik JWT voor authenticatie
- Implementeer CORS policies
- Regular security audits
