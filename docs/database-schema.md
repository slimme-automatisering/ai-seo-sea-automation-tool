# Database Schema Documentation

## 1. PostgreSQL Schema (Prisma)

### Users Table
- **id:** Primary key (UUID)
- **email:** Unique email address (string)
- **name:** User's name (string)
- **googleId:** Google OAuth ID (optional string)
- **passwordHash:** Hashed password (optional string)
- **role:** User role (enum: ADMIN, MANAGER, USER)

### Campaigns Table
- **id:** Primary key (UUID)
- **userId:** Foreign key referencing Users (UUID)
- **name:** Campaign name (string)
- **type:** Campaign type (enum: SEO, SEA, COMBINED)
- **budget:** Campaign budget (float)
- **status:** Campaign status (enum: DRAFT, ACTIVE, PAUSED, COMPLETED, ARCHIVED)
- **startDate:** Campaign start date (date)
- **endDate:** Campaign end date (optional date)

### Keywords Table
- **id:** Primary key (UUID)
- **campaignId:** Foreign key referencing Campaigns (UUID)
- **word:** Keyword (string)
- **volume:** Search volume (optional int)
- **difficulty:** SEO difficulty score (optional float)
- **cpc:** Cost per click (optional float)
- **position:** Current ranking position (optional int)

### Content Table
- **id:** Primary key (UUID)
- **campaignId:** Foreign key referencing Campaigns (UUID)
- **type:** Content type (enum: BLOG_POST, LANDING_PAGE, PRODUCT_DESCRIPTION, META_DESCRIPTION, ALT_TEXT)
- **title:** Content title (string)
- **content:** Content text (text)
- **status:** Content status (enum: DRAFT, ACTIVE, PAUSED, COMPLETED, ARCHIVED)
- **seoScore:** SEO score (optional float)

## 2. MongoDB Schema

### Logs Collection
```typescript
interface Log {
  _id: ObjectId
  timestamp: Date
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  context?: {
    userId?: string
    campaignId?: string
    action?: string
  }
  stack?: string
}
```

### Analytics Collection
```typescript
interface PageAnalytics {
  _id: ObjectId
  url: string
  timestamp: Date
  metrics: {
    pageViews: number
    uniqueVisitors: number
    bounceRate: number
    avgTimeOnPage: number
    exitRate: number
  }
  deviceData: {
    mobile: number
    desktop: number
    tablet: number
  }
  locationData: {
    country: string
    count: number
  }[]
}
```

### SEO Metrics Collection
```typescript
interface SEOMetrics {
  _id: ObjectId
  url: string
  timestamp: Date
  campaignId: string
  rankings: {
    keyword: string
    position: number
    change?: number
  }[]
  technicalMetrics: {
    loadTime: number
    mobileScore: number
    sslScore: number
    seoScore: number
  }
  contentMetrics: {
    wordCount: number
    readabilityScore: number
    uniqueness: number
  }
  backlinks: {
    total: number
    newLinks: number
    lostLinks: number
    doFollow: number
    noFollow: number
  }
}
```

### SEA Metrics Collection
```typescript
interface SEAMetrics {
  _id: ObjectId
  campaignId: string
  timestamp: Date
  metrics: {
    impressions: number
    clicks: number
    ctr: number
    avgCpc: number
    cost: number
    conversions: number
    conversionRate: number
    avgPosition: number
  }
  adGroups: {
    name: string
    metrics: {
      impressions: number
      clicks: number
      ctr: number
      avgCpc: number
      cost: number
    }
  }[]
  keywords: {
    keyword: string
    metrics: {
      impressions: number
      clicks: number
      ctr: number
      avgCpc: number
      avgPosition: number
    }
  }[]
}
```

### Competitor Data Collection
```typescript
interface CompetitorData {
  _id: ObjectId
  url: string
  lastUpdated: Date
  seoMetrics: {
    domainAuthority: number
    pageAuthority: number
    totalBacklinks: number
    organicKeywords: number
    organicTraffic: number
  }
  contentData: {
    totalPages: number
    blogPosts: number
    averageWordCount: number
  }
  keywordRankings: {
    keyword: string
    position: number
    url: string
    lastUpdated: Date
  }[]
  backlinks: {
    url: string
    authority: number
    anchor: string
    firstSeen: Date
    lastSeen: Date
  }[]
  contentGaps: {
    keyword: string
    difficulty: number
    searchVolume: number
    opportunity: 'high' | 'medium' | 'low'
  }[]
}
```

## 3. Indexen

### PostgreSQL Indexen
- Users.email (unique)
- Users.googleId (unique)
- Campaigns.userId
- Keywords.campaignId
- Content.campaignId

### MongoDB Indexen
- logs: timestamp, level, context.userId, context.campaignId
- analytics: url, timestamp, metrics.pageViews
- seoMetrics: url, timestamp, campaignId, rankings.keyword
- seaMetrics: campaignId, timestamp, keywords.keyword
- competitorData: url (unique), lastUpdated, keywordRankings.keyword

## 4. Relaties
- Users → Campaigns: One-to-many
- Campaigns → Keywords: One-to-many
- Campaigns → Content: One-to-many
- PostgreSQL → MongoDB: Via campaignId en url references