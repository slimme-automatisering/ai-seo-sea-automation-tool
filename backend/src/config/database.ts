import { PrismaClient } from '@prisma/client'
import { MongoClient } from 'mongodb'
import { createClient } from 'redis'

// PostgreSQL setup met Prisma
export const prisma = new PrismaClient()

// MongoDB setup
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const mongoDbName = process.env.MONGODB_DB_NAME || 'ai_seo_sea_analytics'

export const mongoClient = new MongoClient(mongoUrl)

export const getMongoDb = async () => {
  if (!mongoClient.connect()) {
    await mongoClient.connect()
  }
  return mongoClient.db(mongoDbName)
}

// Redis setup voor caching
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

export const redisClient = createClient({
  url: redisUrl,
})

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err)
})

// MongoDB collections
export const collections = {
  logs: 'logs',
  analytics: 'analytics',
  seoMetrics: 'seo_metrics',
  seaMetrics: 'sea_metrics',
  competitorData: 'competitor_data',
} as const

// Helper functie voor MongoDB queries
export const getCollection = async (collectionName: keyof typeof collections) => {
  const db = await getMongoDb()
  return db.collection(collections[collectionName])
}

// Initialiseer databases
export const initializeDatabases = async () => {
  try {
    // Test PostgreSQL connectie
    await prisma.$connect()
    console.log('✅ PostgreSQL connected')

    // Test MongoDB connectie
    await mongoClient.connect()
    console.log('✅ MongoDB connected')

    // Test Redis connectie
    await redisClient.connect()
    console.log('✅ Redis connected')

    // Maak MongoDB indexes aan
    const db = await getMongoDb()
    
    // Logs collection indexes
    await db.collection(collections.logs).createIndex({ timestamp: 1 })
    await db.collection(collections.logs).createIndex({ level: 1 })
    
    // Analytics collection indexes
    await db.collection(collections.analytics).createIndex({ campaignId: 1 })
    await db.collection(collections.analytics).createIndex({ timestamp: 1 })
    
    // SEO metrics collection indexes
    await db.collection(collections.seoMetrics).createIndex({ url: 1 })
    await db.collection(collections.seoMetrics).createIndex({ timestamp: 1 })
    
    // SEA metrics collection indexes
    await db.collection(collections.seaMetrics).createIndex({ campaignId: 1 })
    await db.collection(collections.seaMetrics).createIndex({ timestamp: 1 })
    
    // Competitor data collection indexes
    await db.collection(collections.competitorData).createIndex({ url: 1 })
    await db.collection(collections.competitorData).createIndex({ lastUpdated: 1 })

    console.log('✅ MongoDB indexes created')
  } catch (error) {
    console.error('Database initialization failed:', error)
    throw error
  }
}

// Cleanup functie
export const closeDatabaseConnections = async () => {
  await prisma.$disconnect()
  await mongoClient.close()
  await redisClient.disconnect()
}
