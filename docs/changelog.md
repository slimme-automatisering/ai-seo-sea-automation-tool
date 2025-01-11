# Changelog

Alle belangrijke wijzigingen in dit project worden hier gedocumenteerd.

## [2025-01-11]

### Toegevoegd
- Docker ontwikkelomgeving opgezet
  - Frontend container met Node.js en hot-reloading
  - Backend container met Node.js en Prisma
  - PostgreSQL database container
  - MongoDB database container
  - Redis cache container
- Docker Compose configuratie voor development
- Development Dockerfiles voor frontend en backend
- Monitoring stack met Prometheus en Grafana
- Setup documentatie met Docker instructies
- Environment variabelen template (.env.example)

### Gewijzigd
- Project structuur geoptimaliseerd voor Docker
- Development workflow aangepast voor containerization
- Database connecties geconfigureerd voor Docker netwerk

### Beveiliging
- Veilige standaardconfiguratie voor databases
- Environment variabelen gescheiden van code
- Secrets management verbeterd
