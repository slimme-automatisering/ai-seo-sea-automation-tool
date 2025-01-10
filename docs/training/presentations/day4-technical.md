# SEO & SEA Training - Dag 4: Technische SEO

## 1. Technische SEO Basis
### Site Architectuur
- URL structuur
- Directory organisatie
- Navigation paths
- Breadcrumbs

### Crawlability
- Robots.txt
- XML sitemaps
- Canonical tags
- Noindex/nofollow

### Mobile-First
- Responsive design
- Mobile usability
- Page speed
- Core Web Vitals

## 2. Platform Tools - Technische Analyse
### SeoAnalysisService
```typescript
async analyzePage(url: string): Promise<SeoAnalysisResult> {
    return {
        meta: this.analyzeMeta(document),
        content: this.analyzeContent(document),
        technical: await this.analyzeTechnical(url, html),
        suggestions: []
    };
}
```

### Performance Monitoring
- Laadtijd metrics
- Server response
- Resource optimalisatie
- Cache strategie

### Mobile Optimization
- Mobile-friendly test
- Viewport settings
- Touch elements
- Font sizing

## 3. Technische Optimalisatie
### Laadtijd Verbetering
- Image optimalisatie
- Code minification
- Browser caching
- GZIP compressie

### Mobile-First Optimalisatie
- AMP implementatie
- Progressive enhancement
- Touch targets
- Viewport configuration

### Schema Markup
- Organization schema
- Product schema
- Article schema
- FAQ schema

## 4. Technische Audit
### Site Analyse
1. Crawl rapport
2. Performance metrics
3. Mobile-friendly check
4. Security scan

### Actieplan
1. Prioriteiten stellen
2. Quick wins
3. Lange termijn taken
4. Monitoring setup

## Huiswerk
1. Technische audit eigen site
2. Performance optimalisatie
3. Schema markup implementatie
4. Mobile-first checklist

## Tools & Resources
- SeoAnalysisService
- Google Search Console
- PageSpeed Insights
- Mobile-Friendly Test
- Schema Validator
