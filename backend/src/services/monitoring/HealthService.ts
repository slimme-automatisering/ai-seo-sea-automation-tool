import { ConfigService } from '../config/ConfigService';
import { LoggingService } from './LoggingService';
import { Pool } from 'pg';
import Redis from 'ioredis';
import { Channel } from 'amqplib';

interface HealthStatus {
    status: 'healthy' | 'unhealthy' | 'degraded';
    details: {
        [key: string]: {
            status: 'up' | 'down' | 'degraded';
            message?: string;
            latency?: number;
        };
    };
    timestamp: string;
}

export class HealthService {
    private config: ConfigService;
    private logger: LoggingService;
    private db: Pool;
    private redis: Redis;
    private messageQueue: Channel;

    constructor(
        config: ConfigService,
        logger: LoggingService,
        db: Pool,
        redis: Redis,
        messageQueue: Channel
    ) {
        this.config = config;
        this.logger = logger;
        this.db = db;
        this.redis = redis;
        this.messageQueue = messageQueue;
    }

    // Overall health check
    public async checkHealth(): Promise<HealthStatus> {
        const details: HealthStatus['details'] = {};
        let overallStatus: HealthStatus['status'] = 'healthy';

        // Check database
        const dbStatus = await this.checkDatabase();
        details.database = dbStatus;
        if (dbStatus.status === 'down') overallStatus = 'unhealthy';
        else if (dbStatus.status === 'degraded' && overallStatus === 'healthy') overallStatus = 'degraded';

        // Check Redis
        const redisStatus = await this.checkRedis();
        details.redis = redisStatus;
        if (redisStatus.status === 'down') overallStatus = 'unhealthy';
        else if (redisStatus.status === 'degraded' && overallStatus === 'healthy') overallStatus = 'degraded';

        // Check message queue
        const mqStatus = await this.checkMessageQueue();
        details.messageQueue = mqStatus;
        if (mqStatus.status === 'down') overallStatus = 'unhealthy';
        else if (mqStatus.status === 'degraded' && overallStatus === 'healthy') overallStatus = 'degraded';

        // Check external services
        const externalStatus = await this.checkExternalServices();
        details.externalServices = externalStatus;
        if (externalStatus.status === 'down') overallStatus = 'unhealthy';
        else if (externalStatus.status === 'degraded' && overallStatus === 'healthy') overallStatus = 'degraded';

        const status: HealthStatus = {
            status: overallStatus,
            details,
            timestamp: new Date().toISOString()
        };

        // Log health status
        this.logger.info('Health check uitgevoerd', { status });

        return status;
    }

    // Database health check
    private async checkDatabase(): Promise<{ status: 'up' | 'down' | 'degraded'; message?: string; latency?: number }> {
        try {
            const start = Date.now();
            await this.db.query('SELECT 1');
            const latency = Date.now() - start;

            // Check latency thresholds
            if (latency > 1000) {
                return {
                    status: 'degraded',
                    message: 'Database response tijd is hoog',
                    latency
                };
            }

            return {
                status: 'up',
                latency
            };
        } catch (error) {
            this.logger.error('Database health check mislukt', { error });
            return {
                status: 'down',
                message: 'Database connectie mislukt'
            };
        }
    }

    // Redis health check
    private async checkRedis(): Promise<{ status: 'up' | 'down' | 'degraded'; message?: string; latency?: number }> {
        try {
            const start = Date.now();
            await this.redis.ping();
            const latency = Date.now() - start;

            if (latency > 100) {
                return {
                    status: 'degraded',
                    message: 'Redis response tijd is hoog',
                    latency
                };
            }

            return {
                status: 'up',
                latency
            };
        } catch (error) {
            this.logger.error('Redis health check mislukt', { error });
            return {
                status: 'down',
                message: 'Redis connectie mislukt'
            };
        }
    }

    // Message queue health check
    private async checkMessageQueue(): Promise<{ status: 'up' | 'down' | 'degraded'; message?: string }> {
        try {
            if (this.messageQueue && this.messageQueue.connection) {
                return {
                    status: 'up'
                };
            }
            return {
                status: 'down',
                message: 'Message queue niet verbonden'
            };
        } catch (error) {
            this.logger.error('Message queue health check mislukt', { error });
            return {
                status: 'down',
                message: 'Message queue check mislukt'
            };
        }
    }

    // External services health check
    private async checkExternalServices(): Promise<{ status: 'up' | 'down' | 'degraded'; message?: string }> {
        try {
            const services = [
                { name: 'OpenAI', url: 'https://api.openai.com/v1/engines' },
                { name: 'Google Ads', url: 'https://googleads.googleapis.com/$discovery/rest' },
                { name: 'SEMrush', url: 'https://api.semrush.com' },
                { name: 'Ahrefs', url: 'https://api.ahrefs.com' }
            ];

            const results = await Promise.all(
                services.map(async (service) => {
                    try {
                        const response = await fetch(service.url);
                        return response.ok;
                    } catch {
                        return false;
                    }
                })
            );

            const failedServices = services.filter((_, index) => !results[index]);

            if (failedServices.length === 0) {
                return {
                    status: 'up'
                };
            } else if (failedServices.length < services.length) {
                return {
                    status: 'degraded',
                    message: `Sommige externe services zijn niet beschikbaar: ${failedServices.map(s => s.name).join(', ')}`
                };
            } else {
                return {
                    status: 'down',
                    message: 'Alle externe services zijn niet beschikbaar'
                };
            }
        } catch (error) {
            this.logger.error('External services health check mislukt', { error });
            return {
                status: 'down',
                message: 'External services check mislukt'
            };
        }
    }
}
