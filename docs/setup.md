# Setup Documentatie

## Database Setup

### PostgreSQL
1. Installeer PostgreSQL
2. Maak een nieuwe database aan: `ai_seo_sea_db`
3. Setup environment variabelen in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ai_seo_sea_db"
   ```
4. Run Prisma migraties:
   ```bash
   npx prisma migrate dev
   ```

### MongoDB
1. Installeer MongoDB
2. Setup environment variabelen:
   ```env
   MONGODB_URL="mongodb://localhost:27017"
   MONGODB_DB_NAME="ai_seo_sea_analytics"
   ```
3. MongoDB collecties worden automatisch aangemaakt

### Redis
1. Installeer Redis
2. Setup environment variabelen:
   ```env
   REDIS_URL="redis://localhost:6379"
   ```

## OAuth 2.0 Setup
1. Maak een Google Cloud project aan
2. Setup OAuth 2.0 credentials
3. Voeg environment variabelen toe:
   ```env
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   OAUTH_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"
   ```

## Development Workflow
1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup alle environment variabelen
4. Start development servers:
   ```bash
   # Frontend
   cd frontend && npm run dev
   
   # Backend
   cd backend && npm run dev
   ```

## Testing
- Unit tests: `npm test`
- Integration tests: `npm run test:integration`
- E2E tests: `npm run test:e2e`

## Deployment (TODO)
- CI/CD setup
- Production build process
- Deployment instructies
