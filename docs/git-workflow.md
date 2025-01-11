# Git Workflow

## Branch Strategie

### Hoofdbranches
- `main`: Productie code
  - Direct pushen niet toegestaan
  - Merge alleen via pull request
  - Vereist code review
  - Automatische tests moeten slagen
  
- `develop`: Ontwikkelingscode
  - Direct pushen niet toegestaan
  - Merge alleen via pull request
  - Vereist code review
  - Automatische tests moeten slagen

### Feature Branches
- Naam: `feature/naam-van-feature`
- Branchen vanaf: `develop`
- Mergen naar: `develop`
- Voorbeeld: `feature/oauth-implementation`

### Hotfix Branches
- Naam: `hotfix/beschrijving`
- Branchen vanaf: `main`
- Mergen naar: `main` en `develop`
- Voorbeeld: `hotfix/fix-login-crash`

### Release Branches
- Naam: `release/v1.x.x`
- Branchen vanaf: `develop`
- Mergen naar: `main` en `develop`
- Voorbeeld: `release/v1.0.0`

## Versioning

### Tags
- Productie releases: `v1.0.0`
- Beta releases: `v1.0.0-beta.1`
- Alpha releases: `v1.0.0-alpha.1`

### Semantic Versioning
- Major: Breaking changes (`v1.0.0` → `v2.0.0`)
- Minor: Nieuwe features (`v1.0.0` → `v1.1.0`)
- Patch: Bugfixes (`v1.0.0` → `v1.0.1`)

## Workflow

### Nieuwe Feature
1. Branch vanaf `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/naam-van-feature
   ```

2. Werk aan feature:
   ```bash
   git add .
   git commit -m "feat: beschrijving"
   ```

3. Push feature branch:
   ```bash
   git push -u origin feature/naam-van-feature
   ```

4. Open pull request naar `develop`

### Hotfix
1. Branch vanaf `main`:
   ```bash
   git checkout main
   git pull
   git checkout -b hotfix/beschrijving
   ```

2. Fix het probleem:
   ```bash
   git add .
   git commit -m "fix: beschrijving"
   ```

3. Push hotfix branch:
   ```bash
   git push -u origin hotfix/beschrijving
   ```

4. Open pull requests naar `main` en `develop`

### Release
1. Branch vanaf `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b release/v1.0.0
   ```

2. Update versie en changelog:
   ```bash
   git add .
   git commit -m "chore: bump version to v1.0.0"
   ```

3. Push release branch:
   ```bash
   git push -u origin release/v1.0.0
   ```

4. Open pull requests naar `main` en `develop`

## CI/CD Pipeline

### Pull Request Checks
- Type checking
- Linting
- Unit tests
- Integration tests
- Build verificatie

### Deployment
- Develop: Automatische deployment naar staging
- Main: Handmatige goedkeuring voor productie

## Branch Protection Rules

### Main & Develop
- Pull request verplicht
- Code review verplicht (minimaal 1 reviewer)
- CI checks moeten slagen
- Branch moet up-to-date zijn
- Direct pushen niet toegestaan

### Feature & Hotfix Branches
- CI checks moeten slagen
- Branch moet up-to-date zijn voor merge
