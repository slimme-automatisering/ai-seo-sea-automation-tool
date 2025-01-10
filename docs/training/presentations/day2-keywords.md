# SEO & SEA Training - Dag 2: Keyword Research

## 1. Keyword Research Theorie
### Zoekintentie
- Informationeel
- Navigationeel
- Transactioneel
- Commercieel

### Keyword Types
- Short-tail keywords
- Long-tail keywords
- LSI keywords
- Negative keywords

### Research Methodologie
- Brainstorming
- Concurrent analyse
- Trend analyse
- Seizoensgebondenheid

## 2. Platform Tools - Keyword Research
### KeywordResearchService
```typescript
async researchKeywords(params: {
    seed: string;
    language: string;
    country: string;
    limit?: number;
}): Promise<KeywordSuggestion[]>
```

### SEMrush Integratie
- Keyword difficulty
- Search volume
- CPC data
- SERP features

### Ahrefs Integratie
- Backlink data
- Content gap analyse
- Ranking history
- Click metrics

## 3. Keyword Strategie
### Keyword Clustering
- Thematische groepen
- User journey mapping
- Content mapping
- Ad group structuur

### Zoekvolume Analyse
- Volume trends
- Seizoenspatronen
- Geografische spreiding
- Device verdeling

### Concurrentie Analyse
- Competitor keywords
- Share of voice
- Gap analyse
- Opportunity scoring

## 4. Praktijkopdracht
### Keyword Research Project
1. Seed keywords identificeren
2. KeywordResearchService gebruiken
3. Data analyseren
4. Strategie ontwikkelen

### Rapportage
1. Volume analyse
2. Competitie metrics
3. Opportunity scoring
4. Implementatie plan

## Huiswerk
1. Complete keyword analyse voor eigen project
2. Concurrent analyse rapport
3. Content gap identificatie
4. Voorbereiden presentatie voor morgen

## Tools & Resources
- KeywordResearchService
- SEMrush API
- Ahrefs API
- Google Trends
- Google Keyword Planner
