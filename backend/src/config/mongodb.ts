import { MongoClient, Collection } from 'mongodb'
import type { Log, PageAnalytics, SEOMetrics, SEAMetrics, CompetitorData, MongoIndexes } from '../types/mongodb'

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB_NAME || 'ai_seo_sea_analytics'

export const mongoClient = new MongoClient(mongoUrl)

export interface Collections {
  logs: Collection<Log>
  analytics: Collection<PageAnalytics>
  seoMetrics: Collection<SEOMetrics>
  seaMetrics: Collection<SEAMetrics>
  competitorData: Collection<CompetitorData>
}

export const collections: Collections = {} as Collections

export async function connectToMongo() {
  try {
    await mongoClient.connect()
    console.log('✅ Connected to MongoDB')

    const db = mongoClient.db(dbName)

    // Initialize collections with types
    collections.logs = db.collection('logs')
    collections.analytics = db.collection('analytics')
    collections.seoMetrics = db.collection('seo_metrics')
    collections.seaMetrics = db.collection('sea_metrics')
    collections.competitorData = db.collection('competitor_data')

    // Create indexes
    await createIndexes()

    console.log('✅ MongoDB collections and indexes initialized')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

async function createIndexes() {
  // Logs indexes
  await collections.logs.createIndexes([
    { key: { timestamp: 1 } },
    { key: { level: 1 } },
    { key: { 'context.userId': 1 } },
    { key: { 'context.campaignId': 1 } }
  ])

  // Analytics indexes
  await collections.analytics.createIndexes([
    { key: { url: 1 } },
    { key: { timestamp: 1 } },
    { key: { 'metrics.pageViews': -1 } }
  ])

  // SEO metrics indexes
  await collections.seoMetrics.createIndexes([
    { key: { url: 1 } },
    { key: { timestamp: 1 } },
    { key: { campaignId: 1 } },
    { key: { 'rankings.keyword': 1 } }
  ])

  // SEA metrics indexes
  await collections.seaMetrics.createIndexes([
    { key: { campaignId: 1 } },
    { key: { timestamp: 1 } },
    { key: { 'keywords.keyword': 1 } }
  ])

  // Competitor data indexes
  await collections.competitorData.createIndexes([
    { key: { url: 1 }, unique: true },
    { key: { lastUpdated: 1 } },
    { key: { 'keywordRankings.keyword': 1 } }
  ])
}

export async function disconnectFromMongo() {
  try {
    await mongoClient.close()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error)
    throw error
  }
}
