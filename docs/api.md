# API Documentatie

## 1. Core Services

### SeoAnalysisService
```typescript
interface SeoAnalysisService {
    // Analyseer een specifieke pagina
    analyzePage(url: string): Promise<SeoAnalysisResult>;
    
    // Analyseer technische aspecten
    analyzeTechnical(url: string, html: string): Promise<TechnicalAnalysis>;
    
    // Check mobile optimalisatie
    checkMobileOptimization(html: string): Promise<MobileScore>;
    
    // Meet laadtijd
    measureLoadTime(url: string): Promise<LoadTimeMetrics>;
}

interface SeoAnalysisResult {
    meta: MetaAnalysis;
    content: ContentAnalysis;
    technical: TechnicalAnalysis;
    suggestions: string[];
}
```

### KeywordResearchService
```typescript
interface KeywordResearchService {
    // Zoek nieuwe keywords
    researchKeywords(params: {
        seed: string;
        language: string;
        country: string;
        limit?: number;
    }): Promise<KeywordSuggestion[]>;
    
    // Analyseer keyword moeilijkheid
    analyzeKeywordDifficulty(keyword: string): Promise<KeywordDifficulty>;
    
    // Get SERP data
    getSemrushKeywordAnalysis(keyword: string): Promise<SerpData>;
}

interface KeywordSuggestion {
    keyword: string;
    searchVolume: number;
    difficulty: number;
    cpc: number;
}
```

### ContentGenerationService
```typescript
interface ContentGenerationService {
    // Genereer nieuwe content
    generateContent(params: {
        type: 'blog' | 'product' | 'meta' | 'alt-text';
        keywords: string[];
        tone?: string;
        length?: number;
        context?: string;
    }): Promise<string>;
    
    // Update bestaande content
    updateContent(content: string, params: {
        keywords: string[];
        tone?: string;
    }): Promise<string>;
    
    // Suggereer blog onderwerpen
    suggestBlogTopics(params: {
        keywords: string[];
        industry: string;
    }): Promise<string[]>;
}
```

### GoogleAdsService
```typescript
interface GoogleAdsService {
    // Creëer nieuwe campagne
    createCampaign(params: {
        name: string;
        budget: number;
        targetLocations: string[];
        keywords: string[];
        negativeKeywords?: string[];
        startDate?: Date;
        endDate?: Date;
    }): Promise<string>;
    
    // Maak shopping campagne
    createShoppingCampaign(params: {
        merchantId: string;
        budget: number;
        targetRoas: number;
    }): Promise<string>;
    
    // Performance tracking
    getCampaignPerformance(campaignId: string): Promise<CampaignMetrics>;
}
```

## 2. REST Endpoints

### SEO Endpoints

#### GET /api/seo/analyze
Analyseer een specifieke URL.

**Parameters:**
```json
{
    "url": "string",
    "depth": "number",
    "checkMobile": "boolean"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "meta": {},
        "content": {},
        "technical": {},
        "suggestions": []
    }
}
```

### Keyword Endpoints

#### POST /api/keywords/research
Start keyword research.

**Request Body:**
```json
{
    "seed": "string",
    "language": "string",
    "country": "string",
    "limit": "number"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "keywords": [
            {
                "keyword": "string",
                "searchVolume": "number",
                "difficulty": "number",
                "cpc": "number"
            }
        ]
    }
}
```

### Content Endpoints

#### POST /api/content/generate
Genereer nieuwe content.

**Request Body:**
```json
{
    "type": "blog|product|meta|alt-text",
    "keywords": ["string"],
    "tone": "string",
    "length": "number",
    "context": "string"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "content": "string"
    }
}
```

### Google Ads Endpoints

#### POST /api/ads/campaigns
Maak nieuwe campagne.

**Request Body:**
```json
{
    "name": "string",
    "budget": "number",
    "targetLocations": ["string"],
    "keywords": ["string"],
    "negativeKeywords": ["string"],
    "startDate": "date",
    "endDate": "date"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "campaignId": "string"
    }
}
```

## 3. Authenticatie
Alle API endpoints vereisen authenticatie via JWT tokens:
```
Authorization: Bearer <jwt_token>
```

## 4. Rate Limiting
- 100 requests per 15 minuten per IP
- Headers:
  - X-RateLimit-Limit
  - X-RateLimit-Remaining
  - X-RateLimit-Reset

## 5. Error Handling
```json
{
    "success": false,
    "error": {
        "code": "string",
        "message": "string",
        "details": {}
    }
}
```

## 6. WebSocket Events
```typescript
interface WebSocketEvents {
    // Campaign updates
    'campaign.status': (campaignId: string, status: string) => void;
    
    // Content generation progress
    'content.progress': (requestId: string, progress: number) => void;
    
    // Analysis updates
    'analysis.complete': (analysisId: string, results: any) => void;
}
```

## 7. Security
- HTTPS verplicht
- CORS beperkt tot gewhitelist domains
- Rate limiting per IP
- Input validatie
- SQL injection preventie
- XSS protection