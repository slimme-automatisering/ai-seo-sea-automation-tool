# Praktijkcase 2: Local Business SEO & SEA

## Scenario
Een lokaal advocatenkantoor wil hun online zichtbaarheid verbeteren in hun regio (Amsterdam). Ze hebben een beperkt budget maar willen maximale impact maken in hun lokale markt. Ze richten zich specifiek op familierecht en arbeidsrecht.

## Uitgangssituatie

### Website
- WordPress website
- 10 servicepagina's
- Geen blog
- Geen lokale SEO optimalisatie
- Verouderde content

### Marketing
- Geen Google Ads
- Geen Google My Business
- Beperkte sociale media aanwezigheid
- Geen reviews strategie

### Analytics
- 500 bezoekers/maand
- 10 leads/maand
- 90% verkeer uit Nederland
- 60% mobiel verkeer

## Opdracht
Gebruik het AI-SEO-SEA platform om:

1. Lokale SEO Setup
```typescript
// Local SEO analyse
const localSeo = await seoService.analyzeLocalSeo('advocatenkantoor.nl');

// Genereer local schema
const localSchema = await seoService.generateLocalBusinessSchema({
    name: 'Advocatenkantoor Amsterdam',
    type: 'LegalService',
    address: {
        street: 'Herengracht 100',
        city: 'Amsterdam',
        postalCode: '1017 BS',
        country: 'NL'
    }
});

// Keyword research voor lokale zoektermen
const localKeywords = await keywordService.researchKeywords({
    seed: 'advocaat amsterdam',
    language: 'nl',
    country: 'NL',
    location: 'Amsterdam'
});
```

2. Content Strategie
```typescript
// Genereer lokale landingspagina's
const landingPage = await contentService.generateContent({
    type: 'landing',
    keywords: ['advocaat amsterdam', 'familierecht'],
    tone: 'professional',
    context: 'Lokale advocaat landingspagina'
});

// Blog content planning
const blogTopics = await contentService.suggestBlogTopics({
    keywords: localKeywords,
    industry: 'legal',
    location: 'Amsterdam'
});
```

3. Google Ads Lokale Campagne
```typescript
// Setup lokale campagne
const localCampaign = await adsService.createCampaign({
    name: 'Advocaat Amsterdam - Familierecht',
    budget: 500,
    targetLocations: ['Amsterdam', 'Amstelveen'],
    radius: 25,
    keywords: localKeywords
});

// Call-only campagne
const callCampaign = await adsService.createCallCampaign({
    phone: '+31201234567',
    budget: 200,
    schedule: ['Ma-Vr 9:00-17:00']
});
```

## Deliverables

### Week 1: Lokale Optimalisatie
1. Google My Business optimalisatie
2. Lokale schema implementatie
3. NAP consistentie check
4. Review strategie

### Week 2: Content & SEO
1. Landingspagina's
2. Blog artikelen
3. Service pagina's
4. Lokale backlink plan

### Week 3: Google Ads
1. Zoek campagne
2. Call campagne
3. Display campagne
4. Remarketing setup

## Evaluatie Criteria
- [ ] Lokale zoekresultaten verbeterd
- [ ] Google My Business geoptimaliseerd
- [ ] Content strategie geïmplementeerd
- [ ] Lokale campagnes actief

## KPI's
1. Lokale zoekpositie: Top 3
2. Leads: +100%
3. Google My Business views: +200%
4. Cost per lead: -30%

## Budget
- SEO implementatie: €2.000
- Content creatie: €1.000
- Google Ads: €500/maand

## Timeline
- Week 1: Lokale SEO setup
- Week 2-3: Content creatie
- Week 4: Google Ads launch
- Week 5-6: Optimalisatie
