import Redis from 'ioredis';
import { logger } from './logger';

// Redis client configuratie
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Error handling
redis.on('error', (error) => {
  logger.error('Redis connection error:', error);
});

redis.on('connect', () => {
  logger.info('Successfully connected to Redis');
});

// Cache wrapper voor async functies
export const cacheWrapper = async <T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = 3600 // Standaard 1 uur
): Promise<T> => {
  try {
    // Check cache
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    // Get fresh data
    const data = await fn();
    
    // Store in cache
    await redis.setex(key, ttl, JSON.stringify(data));
    
    return data;
  } catch (error) {
    logger.error('Cache error:', error);
    // Als cache faalt, return direct data
    return fn();
  }
};

// Cache invalidatie helpers
export const invalidateCache = async (pattern: string): Promise<void> => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    logger.error('Cache invalidation error:', error);
  }
};

// Cache prefixen voor verschillende data types
export const CacheKeys = {
  USER: 'user:',
  WEBSITE: 'website:',
  CAMPAIGN: 'campaign:',
  KEYWORD: 'keyword:',
  ANALYTICS: 'analytics:',
  SEO_AUDIT: 'seo_audit:',
  COMPETITOR: 'competitor:',
} as const;

// Cache TTL configuratie (in seconden)
export const CacheTTL = {
  SHORT: 300,      // 5 minuten
  MEDIUM: 3600,    // 1 uur
  LONG: 86400,     // 1 dag
  VERY_LONG: 604800 // 1 week
} as const;

// Batch operations helper
export const batchGetCache = async <T>(
  keys: string[]
): Promise<(T | null)[]> => {
  try {
    const pipeline = redis.pipeline();
    keys.forEach(key => pipeline.get(key));
    
    const results = await pipeline.exec();
    return results?.map(([err, data]) => {
      if (err || !data) return null;
      return JSON.parse(data as string);
    }) || [];
  } catch (error) {
    logger.error('Batch cache error:', error);
    return new Array(keys.length).fill(null);
  }
};

// Cache stats helper
export const getCacheStats = async (): Promise<{
  keys: number;
  memory: string;
  hitRate: number;
}> => {
  try {
    const info = await redis.info();
    const memory = info
      .split('\n')
      .find(line => line.startsWith('used_memory_human:'))
      ?.split(':')[1]
      .trim() || '0';
    
    const keyCount = parseInt(
      info
        .split('\n')
        .find(line => line.startsWith('keyspace_hits:'))
        ?.split(':')[1]
        .trim() || '0'
    );
    
    const hitCount = parseInt(
      info
        .split('\n')
        .find(line => line.startsWith('keyspace_hits:'))
        ?.split(':')[1]
        .trim() || '0'
    );
    
    const missCount = parseInt(
      info
        .split('\n')
        .find(line => line.startsWith('keyspace_misses:'))
        ?.split(':')[1]
        .trim() || '0'
    );
    
    const hitRate = hitCount / (hitCount + missCount) || 0;
    
    return {
      keys: keyCount,
      memory,
      hitRate
    };
  } catch (error) {
    logger.error('Cache stats error:', error);
    return {
      keys: 0,
      memory: '0',
      hitRate: 0
    };
  }
};
