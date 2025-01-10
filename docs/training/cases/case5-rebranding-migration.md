# Praktijkcase 5: Rebranding & Site Migratie

## Scenario
Een gevestigd consultancybedrijf gaat door een complete rebranding, inclusief nieuwe naam en website. Ze willen hun sterke SEO positie behouden tijdens de migratie en hun nieuwe merk effectief positioneren via SEA.

## Uitgangssituatie

### Website
- 10 jaar oud domein
- 500+ indexed pages
- DA: 45
- 100+ backlinks
- 50K organisch verkeer

### Marketing
- Sterke organische positie
- Basic Google Ads
- Verouderde branding
- Inconsistente messaging

### Metrics
- Bounce rate: 60%
- Avg. time: 2:30
- Leads: 200/maand
- Rankings: Top 3

## Opdracht
Gebruik het AI-SEO-SEA platform om:

1. SEO Migratie
```typescript
// Crawl huidige site
const currentSite = await seoService.crawlSite('oldomain.nl');

// Genereer redirect mapping
const redirects = await seoService.generateRedirectMap({
    oldDomain: 'oldomain.nl',
    newDomain: 'newdomain.nl',
    urls: currentSite.urls
});

// Check redirect implementatie
const redirectCheck = await seoService.validateRedirects(redirects);
```

2. Content Transitie
```typescript
// Update alle content
const updatedContent = await contentService.updateBranding({
    oldBrand: 'Old Name',
    newBrand: 'New Name',
    tone: 'modern',
    industry: 'consulting'
});

// Genereer nieuwe content
const newContent = await contentService.generateContent({
    type: 'landing',
    keywords: brandKeywords,
    tone: 'modern',
    brand: 'New Name'
});
```

3. Brand Campagnes
```typescript
// Brand protection campagne
const brandCampaign = await adsService.createCampaign({
    name: 'Brand Protection',
    budget: 1000,
    keywords: ['new brand', 'old brand'],
    negativeKeywords: ['free', 'cheap']
});

// Rebranding awareness
const awarenessCampaign = await adsService.createDisplayCampaign({
    name: 'Rebranding Announcement',
    budget: 2000,
    targeting: {
        interests: ['business', 'consulting'],
        remarketing: true
    }
});
```

## Deliverables

### Week 1: Migratie Planning
1. Complete site crawl
2. Redirect mapping
3. Content inventory
4. Technical checklist

### Week 2: Content Transitie
1. Content updates
2. Meta data migratie
3. URL structuur
4. Internal linking

### Week 3: Launch & Monitor
1. Redirect implementatie
2. Rankings monitoring
3. Brand campagnes
4. Performance tracking

## Evaluatie Criteria
- [ ] Behoud van rankings
- [ ] Correcte redirects
- [ ] Brand visibility
- [ ] Traffic behoud

## KPI's
1. Rankings behoud: 95%
2. Traffic verlies: <10%
3. Brand awareness: +50%
4. Leads: -0%

## Budget
- SEO migratie: €10.000
- Content update: €5.000
- Brand campagne: €3.000/maand
- Display ads: €2.000/maand

## Timeline
- Week 1-2: Migratie Planning
- Week 3-4: Content Updates
- Week 5: Technical Migratie
- Week 6-8: Monitoring
