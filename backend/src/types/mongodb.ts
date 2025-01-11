import { ObjectId } from 'mongodb'

// Log schema
export interface Log {
  _id: ObjectId
  timestamp: Date
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  context?: {
    userId?: string
    campaignId?: string
    action?: string
    [key: string]: any
  }
  stack?: string
}

// Analytics schema's
export interface PageAnalytics {
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

export interface SEOMetrics {
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

export interface SEAMetrics {
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

export interface CompetitorData {
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

// Indexen interface voor type-safety
export interface MongoIndexes {
  logs: {
    timestamp: 1
    level: 1
    'context.userId': 1
    'context.campaignId': 1
  }
  analytics: {
    url: 1
    timestamp: 1
    campaignId: 1
  }
  seoMetrics: {
    url: 1
    timestamp: 1
    campaignId: 1
    'rankings.keyword': 1
  }
  seaMetrics: {
    campaignId: 1
    timestamp: 1
    'keywords.keyword': 1
  }
  competitorData: {
    url: 1
    lastUpdated: 1
    'keywordRankings.keyword': 1
  }
}
