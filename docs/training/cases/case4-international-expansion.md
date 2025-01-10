# Praktijkcase 4: Internationale Expansie

## Scenario
Een succesvolle Nederlandse e-learning platform wil uitbreiden naar de Duitse en Franse markt. Ze hebben een sterke positie in Nederland maar geen ervaring met internationale SEO en SEA. Het platform biedt online cursussen in business en technologie.

## Uitgangssituatie

### Platform
- Nederlands platform
- 200+ cursussen
- Multi-language support
- Lokale payment providers
- €1M omzet (NL)

### Marketing
- Sterke NL presence
- Geen int. SEO
- Geen int. campagnes
- Geen lokale content

### Metrics
- 50K NL gebruikers
- €100 AOV
- 3% conversie
- 20% recurring

## Opdracht
Gebruik het AI-SEO-SEA platform om:

1. Internationale SEO
```typescript
// Multi-language keyword research
const deKeywords = await keywordService.researchKeywords({
    seed: 'online kurse',
    language: 'de',
    country: 'DE'
});

const frKeywords = await keywordService.researchKeywords({
    seed: 'cours en ligne',
    language: 'fr',
    country: 'FR'
});

// Hreflang setup
const hreflang = await seoService.generateHreflangTags({
    urls: {
        'nl': 'https://platform.com/nl/',
        'de': 'https://platform.com/de/',
        'fr': 'https://platform.com/fr/'
    }
});
```

2. Lokale Content
```typescript
// Duitse content
const deContent = await contentService.generateContent({
    type: 'landing',
    language: 'de',
    keywords: deKeywords,
    tone: 'professional',
    culture: 'german'
});

// Franse content
const frContent = await contentService.generateContent({
    type: 'landing',
    language: 'fr',
    keywords: frKeywords,
    tone: 'professional',
    culture: 'french'
});
```

3. Internationale Campagnes
```typescript
// Duitse campagne
const deCampaign = await adsService.createCampaign({
    name: 'DE - Business Kurse',
    budget: 3000,
    language: 'de',
    targetLocations: ['DE', 'AT', 'CH'],
    keywords: deKeywords
});

// Franse campagne
const frCampaign = await adsService.createCampaign({
    name: 'FR - Cours Business',
    budget: 2000,
    language: 'fr',
    targetLocations: ['FR', 'BE'],
    keywords: frKeywords
});
```

## Deliverables

### Week 1: Marktonderzoek
1. Competitor analyse per land
2. Keyword research
3. Culturele aanpassingen
4. Lokale partnerships

### Week 2: Technische Setup
1. Internationale SEO
2. Multi-language CMS
3. Lokale payment
4. CDN configuratie

### Week 3: Content & Campagnes
1. Lokale content
2. Landing pages
3. Google Ads
4. Display campagnes

## Evaluatie Criteria
- [ ] Internationale SEO setup
- [ ] Lokale content kwaliteit
- [ ] Campagne performance
- [ ] Conversie per land

## KPI's
1. DE traffic: 10K/maand
2. FR traffic: 8K/maand
3. Int. conversie: 2%
4. Int. omzet: €300K

## Budget
- Int. SEO: €10.000
- Vertalingen: €5.000
- DE Ads: €3.000/maand
- FR Ads: €2.000/maand

## Timeline
- Week 1-2: Research & Planning
- Week 3-4: Technische Setup
- Week 5-6: Content Creatie
- Week 7-8: Campagne Launch
