# Dag 5 Oefening: Google Ads Campagne

## Doel
Leer het gebruik van de GoogleAdsService voor het opzetten en optimaliseren van advertentiecampagnes.

## Voorbereidingen
1. Platform toegang
2. Google Ads API credentials
3. Test budget
4. Target keywords

## Oefening Stappen

### 1. Campagne Setup
```typescript
// Setup service
const adsService = new GoogleAdsService(configService);

// Creëer nieuwe campagne
const campaignId = await adsService.createCampaign({
    name: 'Test Campaign 2024',
    budget: 100,
    targetLocations: ['NL'],
    keywords: ['online marketing', 'seo services'],
    negativeKeywords: ['gratis', 'goedkoop'],
    startDate: new Date(),
    endDate: new Date('2024-12-31')
});
```

### 2. Keyword Management
```typescript
// Voeg keywords toe
await adsService.addKeywords(campaignId, [
    'digital marketing',
    'seo specialist',
    'website optimization'
]);

// Check performance
const performance = await adsService.getCampaignPerformance(campaignId);
```

### 3. Budget & Biedingen
1. Budget allocatie
   - Daily budget
   - Campaign budget
   - Ad group budgets

2. Bidding strategie
   - Manual CPC
   - Target CPA
   - Maximize conversions

3. ROI berekening
   - Cost per click
   - Conversion rate
   - Revenue per conversion

### 4. Ad Creation & Testing
1. Ad copy variaties
   - Headlines
   - Descriptions
   - Call-to-actions

2. A/B testing
   - Ad rotation
   - Performance tracking
   - Statistical significance

3. Landing pages
   - Relevantie
   - Conversion optimalisatie
   - Load speed

## Verwachte Resultaten
1. Live Google Ads campagne
2. Performance rapport
3. A/B test resultaten
4. ROI analyse

## Evaluatie Criteria
- [ ] Effectief gebruik van GoogleAdsService
- [ ] Budget management
- [ ] Keyword strategie
- [ ] Ad copy optimalisatie

## Deliverables
1. Campagne structuur document
2. Keyword performance rapport
3. A/B test resultaten
4. ROI berekening

## Tips
- Start met klein budget
- Monitor quality scores
- Test verschillende ad formats
- Focus op conversie optimalisatie

## Bonus Opdracht
1. Display campaign setup
2. Remarketing implementatie
3. Shopping campaign
4. Advanced bidding strategies
