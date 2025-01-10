import client from 'prom-client';
import { logger } from './logger';

// Creëer een Registry
const register = new client.Registry();

// Voeg default metrics toe (CPU, memory, etc.)
client.collectDefaultMetrics({
  register,
  prefix: 'app_',
});

// HTTP request metrics
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});
register.registerMetric(httpRequestDuration);

// HTTP request counter
export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestsTotal);

// Database query metrics
export const dbQueryDuration = new client.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['operation', 'table'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});
register.registerMetric(dbQueryDuration);

// Redis metrics
export const redisOperationDuration = new client.Histogram({
  name: 'redis_operation_duration_seconds',
  help: 'Duration of Redis operations in seconds',
  labelNames: ['operation'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5],
});
register.registerMetric(redisOperationDuration);

// Cache hit ratio
export const cacheHitRatio = new client.Gauge({
  name: 'cache_hit_ratio',
  help: 'Cache hit ratio',
});
register.registerMetric(cacheHitRatio);

// Job queue metrics
export const bullQueueSize = new client.Gauge({
  name: 'bull_queue_size',
  help: 'Current size of Bull queues',
  labelNames: ['queue'],
});
register.registerMetric(bullQueueSize);

export const bullJobsCompleted = new client.Counter({
  name: 'bull_jobs_completed_total',
  help: 'Total number of completed Bull jobs',
  labelNames: ['queue'],
});
register.registerMetric(bullJobsCompleted);

export const bullJobsFailed = new client.Counter({
  name: 'bull_jobs_failed_total',
  help: 'Total number of failed Bull jobs',
  labelNames: ['queue'],
});
register.registerMetric(bullJobsFailed);

// Business metrics
export const activeUsers = new client.Gauge({
  name: 'active_users',
  help: 'Number of active users in the last 5 minutes',
});
register.registerMetric(activeUsers);

export const seoAuditScore = new client.Histogram({
  name: 'seo_audit_score',
  help: 'Distribution of SEO audit scores',
  buckets: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
});
register.registerMetric(seoAuditScore);

export const contentGenerationDuration = new client.Histogram({
  name: 'content_generation_duration_seconds',
  help: 'Duration of content generation in seconds',
  labelNames: ['type'],
  buckets: [1, 5, 10, 30, 60, 120, 300],
});
register.registerMetric(contentGenerationDuration);

// Helper functies
export const trackHttpRequest = (method: string, route: string, statusCode: number, duration: number) => {
  httpRequestDuration.labels(method, route, statusCode.toString()).observe(duration);
  httpRequestsTotal.labels(method, route, statusCode.toString()).inc();
};

export const trackDbQuery = (operation: string, table: string, duration: number) => {
  dbQueryDuration.labels(operation, table).observe(duration);
};

export const trackRedisOperation = (operation: string, duration: number) => {
  redisOperationDuration.labels(operation).observe(duration);
};

export const updateQueueMetrics = (queueName: string, size: number) => {
  bullQueueSize.labels(queueName).set(size);
};

export const trackJobCompletion = (queueName: string, success: boolean) => {
  if (success) {
    bullJobsCompleted.labels(queueName).inc();
  } else {
    bullJobsFailed.labels(queueName).inc();
  }
};

// Metrics endpoint handler
export const getMetrics = async () => {
  try {
    return await register.metrics();
  } catch (error) {
    logger.error('Error collecting metrics:', error);
    throw error;
  }
};
