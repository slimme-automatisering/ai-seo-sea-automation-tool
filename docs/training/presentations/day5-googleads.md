# SEO & SEA Training - Dag 5: Google Ads

## 1. Google Ads Fundamenten
### Account Structuur
- Account niveau
- Campagne niveau
- Ad group niveau
- Keyword niveau

### Campagne Types
- Search campagnes
- Display campagnes
- Shopping campagnes
- Video campagnes

### Budgettering
- Daily budgets
- Lifetime budgets
- Budget verdeling
- ROI berekening

## 2. Platform Tools - Google Ads
### GoogleAdsService
```typescript
async createCampaign(params: {
    name: string;
    budget: number;
    targetLocations: string[];
    keywords: string[];
    negativeKeywords?: string[];
    startDate?: Date;
    endDate?: Date;
}): Promise<string>
```

### Campaign Management
- Campaign creation
- Budget management
- Performance tracking
- Optimization tools

### Keyword Management
- Keyword research
- Bid management
- Quality Score
- Search terms

## 3. Advertentie Creatie
### Ad Copy
- Headlines
- Descriptions
- Display URL
- Extensions

### A/B Testing
- Ad variations
- Split testing
- Performance metrics
- Statistical significance

### Landing Pages
- Relevantie
- Conversie optimalisatie
- Mobile-friendly
- Load speed

## 4. Week 1 Afsluiting
### Campagne Setup
1. Account structuur
2. Campaign settings
3. Ad groups
4. Keywords & ads

### Performance Review
1. Key metrics
2. Optimization opportunities
3. Budget efficiency
4. ROI analysis

## Huiswerk
1. Complete campaign setup
2. Ad copy variaties
3. Landing page optimalisatie
4. Week 2 voorbereiding

## Tools & Resources
- GoogleAdsService
- Google Ads Editor
- Keyword Planner
- Display Planner
- Analytics integration
