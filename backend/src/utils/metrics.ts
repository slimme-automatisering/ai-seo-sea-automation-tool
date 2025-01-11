import { Counter, Gauge, Histogram } from 'prom-client';
import { Logger } from './logger';

const logger = new Logger('Metrics');

// Application metrics
export const metrics = {
  // HTTP metrics
  httpRequestDuration: new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5]
  }),

  httpRequestTotal: new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
  }),

  // Job metrics
  jobDuration: new Histogram({
    name: 'job_duration_seconds',
    help: 'Duration of background jobs in seconds',
    labelNames: ['queue', 'job_type'],
    buckets: [1, 5, 15, 30, 60, 120]
  }),

  jobsTotal: new Counter({
    name: 'jobs_total',
    help: 'Total number of jobs processed',
    labelNames: ['queue', 'job_type', 'status']
  }),

  activeJobs: new Gauge({
    name: 'active_jobs',
    help: 'Number of currently active jobs',
    labelNames: ['queue']
  }),

  // API metrics
  apiRequestDuration: new Histogram({
    name: 'api_request_duration_seconds',
    help: 'Duration of external API requests in seconds',
    labelNames: ['api', 'endpoint'],
    buckets: [0.1, 0.5, 1, 2, 5, 10]
  }),

  apiRequestsTotal: new Counter({
    name: 'api_requests_total',
    help: 'Total number of external API requests',
    labelNames: ['api', 'endpoint', 'status']
  }),

  // Resource metrics
  memoryUsage: new Gauge({
    name: 'memory_usage_bytes',
    help: 'Process memory usage in bytes'
  }),

  cpuUsage: new Gauge({
    name: 'cpu_usage_percent',
    help: 'Process CPU usage percentage'
  }),

  // Business metrics
  activeUsers: new Gauge({
    name: 'active_users',
    help: 'Number of currently active users'
  }),

  contentGenerationRequests: new Counter({
    name: 'content_generation_requests_total',
    help: 'Total number of content generation requests',
    labelNames: ['content_type', 'status']
  }),

  seoAuditRequests: new Counter({
    name: 'seo_audit_requests_total',
    help: 'Total number of SEO audit requests',
    labelNames: ['audit_type', 'status']
  })
};

// Update system metrics periodically
const updateSystemMetrics = () => {
  try {
    const memUsage = process.memoryUsage();
    metrics.memoryUsage.set(memUsage.heapUsed);

    const startUsage = process.cpuUsage();
    setTimeout(() => {
      const endUsage = process.cpuUsage(startUsage);
      const totalUsage = (endUsage.user + endUsage.system) / 1000000; // Convert to seconds
      metrics.cpuUsage.set(totalUsage * 100);
    }, 100);
  } catch (error) {
    logger.error('Error updating system metrics:', error);
  }
};

// Update system metrics every 15 seconds
setInterval(updateSystemMetrics, 15000);

// Middleware for HTTP metrics
export const metricsMiddleware = (req: any, res: any, next: any) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationSeconds = duration[0] + duration[1] / 1e9;

    metrics.httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route?.path || 'unknown',
        status_code: res.statusCode
      },
      durationSeconds
    );

    metrics.httpRequestTotal.inc({
      method: req.method,
      route: req.route?.path || 'unknown',
      status_code: res.statusCode
    });
  });

  next();
};

export default metrics;
