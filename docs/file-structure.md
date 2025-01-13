# File Structure

````mermaid
ai-seo-sea-automation-tool/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   ├── prd.md                      # Product Requirements Document
│   ├── frontend.md                 # Frontend Documentation
│   ├── backend.md                  # Backend Documentation
│   ├── third-party-libraries.md    # Third-Party Libraries Documentation
│   ├── devops.md                   # DevOps Documentation
│   ├── testing-plan.md             # Testing Plan Documentation
│   ├── security-plan.md            # Security Plan Documentation
│   ├── user-flow.md                # User Flow Documentation
│   ├── code-documentation.md       # Code Documentation
│   ├── database-schema.md          # Database Schema Documentation
│   ├── state-management.md         # State Management Documentation
│   ├── performance-optimization.md # Performance Optimization Documentation
│   ├── api.md                      # API Documentation
├── backend/
│   ├── src/
│   │   ├── config/                 # Configuration files (e.g., database, environment variables)
│   │   ├── controllers/            # Request handlers (e.g., user, campaign, content)
│   │   ├── models/                 # Database models (e.g., User, Campaign, Content)
│   │   ├── routes/                 # API routes (e.g., REST, GraphQL)
│   │   ├── services/               # Business logic (e.g., AI processing, third-party integrations)
│   │   ├── utils/                  # Utility functions (e.g., authentication, caching)
│   │   ├── middleware/             # Middleware (e.g., rate limiting, input validation)
│   │   ├── types/                  # TypeScript type definitions
│   │   └── prisma/                 # Prisma schema en migraties
│   ├── tests/                      # Test files (e.g., unit tests, integration tests)
│   ├── server.ts                   # Server entry point
│   ├── Dockerfile.dev              # Development Docker configuratie
│   ├── .env                        # Environment variables
│   ├── package.json                # Dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuratie
├── frontend/
│   ├── public/                     # Statische bestanden
│   │   ├── assets/               # Media bestanden
│   │   │   ├── images/         # Afbeeldingen
│   │   │   └── icons/         # Iconen
│   │   └── locales/          # Vertalingen
│   ├── src/
│   │   ├── components/       # React componenten
│   │   │   ├── common/      # Gedeelde UI componenten
│   │   │   │   ├── inputs/  # Form inputs
│   │   │   │   │   ├── Button/
│   │   │   │   │   ├── Select/
│   │   │   │   │   └── TextField/
│   │   │   │   ├── feedback/ # Feedback componenten
│   │   │   │   │   ├── Alert/
│   │   │   │   │   ├── Modal/
│   │   │   │   │   └── Toast/
│   │   │   │   ├── data/    # Data weergave
│   │   │   │   │   ├── Table/
│   │   │   │   │   ├── Chart/
│   │   │   │   │   └── Card/
│   │   │   │   └── layout/  # Layout elementen
│   │   │   │       ├── Box/
│   │   │   │       ├── Grid/
│   │   │   │       └── Stack/
│   │   │   └── features/   # Feature modules
│   │   │       ├── analytics/ # Analytics feature
│   │   │       ├── seo/      # SEO feature
│   │   │       └── sea/      # SEA feature
│   │   ├── layouts/        # Pagina layouts
│   │   │   ├── MainLayout/
│   │   │   └── AuthLayout/
│   │   ├── pages/         # Next.js pages
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/    # API services
│   │   ├── store/      # State management
│   │   ├── styles/    # Styling
│   │   ├── types/    # TypeScript types
│   │   └── utils/   # Utilities
│   └── tests/      # Test bestanden
├── README.md                       # Project overview and setup instructions
├── .windsurfrules                  # Windsurf AI Assistant regels
├── ai-seo-sea-automation-tool.code-workspace # VS Code workspace configuratie

# Project Bestandsstructuur

## 1. Root Structuur

```
ai-seo-sea-automation-tool/
├── .github/                    # GitHub configuratie
│   └── workflows/             # CI/CD workflows
├── docs/                      # Projectdocumentatie
│   ├── api/                  # API documentatie
│   │   ├── endpoints.md     # API endpoints
│   │   └── models.md       # Data models
│   ├── architecture/       # Architectuur docs
│   │   ├── frontend.md    # Frontend architectuur
│   │   └── backend.md    # Backend architectuur
│   ├── deployment/      # Deployment docs
│   │   ├── setup.md    # Setup instructies
│   │   └── devops.md  # DevOps procedures
│   └── development/   # Development docs
│       ├── guidelines.md   # Coding guidelines
│       └── workflow.md    # Development workflow
├── backend/               # Backend applicatie
├── frontend/             # Frontend applicatie
├── scripts/             # Hulpscripts
│   ├── setup/         # Setup scripts
│   └── deployment/   # Deployment scripts
└── shared/           # Gedeelde resources
    ├── types/       # TypeScript types
    └── config/     # Configuraties
```

## 2. Backend Structuur

```
backend/
├── src/
│   ├── config/                # Configuratie
│   │   ├── database.ts       # Database config
│   │   ├── cache.ts         # Cache config
│   │   └── auth.ts         # Auth config
│   ├── controllers/        # Request handlers
│   │   ├── analytics/     # Analytics controllers
│   │   ├── auth/         # Auth controllers
│   │   ├── seo/         # SEO controllers
│   │   └── sea/        # SEA controllers
│   ├── services/       # Business logic
│   │   ├── analytics/ # Analytics services
│   │   ├── auth/     # Auth services
│   │   ├── seo/     # SEO services
│   │   └── sea/    # SEA services
│   ├── models/    # Database models
│   ├── routes/   # API routes
│   ├── utils/   # Utilities
│   └── types/  # TypeScript types
├── tests/     # Test bestanden
└── prisma/   # Database schema
```

## 3. Frontend Structuur

```
frontend/
├── public/                     # Statische bestanden
│   ├── assets/               # Media bestanden
│   │   ├── images/         # Afbeeldingen
│   │   └── icons/         # Iconen
│   └── locales/          # Vertalingen
├── src/
│   ├── components/       # React componenten
│   │   ├── common/      # Gedeelde UI componenten
│   │   │   ├── inputs/  # Form inputs
│   │   │   │   ├── Button/
│   │   │   │   ├── Select/
│   │   │   │   └── TextField/
│   │   │   ├── feedback/ # Feedback componenten
│   │   │   │   ├── Alert/
│   │   │   │   ├── Modal/
│   │   │   │   └── Toast/
│   │   │   ├── data/    # Data weergave
│   │   │   │   ├── Table/
│   │   │   │   ├── Chart/
│   │   │   │   └── Card/
│   │   │   └── layout/  # Layout elementen
│   │   │       ├── Box/
│   │   │       ├── Grid/
│   │   │       └── Stack/
│   │   └── features/   # Feature modules
│   │       ├── analytics/ # Analytics feature
│   │       ├── seo/      # SEO feature
│   │       └── sea/      # SEA feature
│   ├── layouts/        # Pagina layouts
│   │   ├── MainLayout/
│   │   └── AuthLayout/
│   ├── pages/         # Next.js pages
│   ├── hooks/        # Custom React hooks
│   ├── services/    # API services
│   ├── store/      # State management
│   ├── styles/    # Styling
│   ├── types/    # TypeScript types
│   └── utils/   # Utilities
└── tests/      # Test bestanden
```

## 4. Shared Resources

```
shared/
├── types/              # Gedeelde types
│   ├── analytics.ts   # Analytics types
│   ├── auth.ts       # Auth types
│   └── models.ts    # Data model types
└── config/         # Gedeelde config
    ├── api.ts     # API config
    └── env.ts    # Env variables
```

## 5. Development Workflow

### 5.1 Branch Structuur
```
main
├── develop
│   ├── feature/analytics
│   ├── feature/auth
│   ├── feature/seo
│   └── feature/sea
└── release
```

### 5.2 Deployment Stages
```
development → staging → production
```

## 6. Best Practices

### 6.1 Naamgeving
- Gebruik descriptieve, consistente namen
- PascalCase voor componenten
- camelCase voor functies/variabelen
- kebab-case voor bestanden/mappen

### 6.2 Code Organisatie
- Feature-based structuur
- Modulaire opbouw
- Duidelijke scheiding van concerns
- Herbruikbare componenten

### 6.3 Documentatie
- Up-to-date README's
- JSDoc comments
- API documentatie
- Architectuur diagrammen

### 6.4 Component Structuur
```
ComponentName/
├── index.tsx      # Component implementatie
├── styles.ts     # Component-specifieke styles
├── types.ts     # Component-specifieke types
├── utils.ts    # Component-specifieke utilities
└── tests/     # Component tests
```
