import { Request, Response } from 'express';
import { HealthService } from '../../services/monitoring/HealthService';
import { MetricsService } from '../../services/monitoring/MetricsService';
import { LoggingService } from '../../services/monitoring/LoggingService';

export class MonitoringController {
    private healthService: HealthService;
    private metricsService: MetricsService;
    private logger: LoggingService;

    constructor(
        healthService: HealthService,
        metricsService: MetricsService,
        logger: LoggingService
    ) {
        this.healthService = healthService;
        this.metricsService = metricsService;
        this.logger = logger;
    }

    // Health check endpoint
    public healthCheck = async (req: Request, res: Response): Promise<void> => {
        try {
            const health = await this.healthService.checkHealth();
            
            const statusCode = health.status === 'healthy' ? 200 :
                             health.status === 'degraded' ? 200 : 503;

            res.status(statusCode).json(health);
        } catch (error) {
            this.logger.error('Health check mislukt', { error });
            res.status(500).json({
                status: 'unhealthy',
                details: {
                    error: 'Health check mislukt'
                },
                timestamp: new Date().toISOString()
            });
        }
    };

    // Liveness probe
    public livenessProbe = async (req: Request, res: Response): Promise<void> => {
        try {
            // Simpele check om te zien of de applicatie draait
            res.status(200).json({
                status: 'alive',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            this.logger.error('Liveness probe mislukt', { error });
            res.status(500).json({
                status: 'dead',
                timestamp: new Date().toISOString()
            });
        }
    };

    // Readiness probe
    public readinessProbe = async (req: Request, res: Response): Promise<void> => {
        try {
            const health = await this.healthService.checkHealth();
            
            if (health.status === 'unhealthy') {
                res.status(503).json({
                    status: 'not_ready',
                    details: health.details,
                    timestamp: new Date().toISOString()
                });
                return;
            }

            res.status(200).json({
                status: 'ready',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            this.logger.error('Readiness probe mislukt', { error });
            res.status(503).json({
                status: 'not_ready',
                timestamp: new Date().toISOString()
            });
        }
    };

    // Metrics endpoint voor Prometheus
    public getMetrics = async (req: Request, res: Response): Promise<void> => {
        try {
            const metrics = await this.metricsService.getMetrics();
            res.set('Content-Type', 'text/plain');
            res.status(200).send(metrics);
        } catch (error) {
            this.logger.error('Metrics ophalen mislukt', { error });
            res.status(500).json({
                success: false,
                error: 'Metrics ophalen mislukt'
            });
        }
    };

    // System status endpoint
    public getSystemStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const systemInfo = {
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage(),
                nodeVersion: process.version,
                platform: process.platform,
                timestamp: new Date().toISOString()
            };

            res.status(200).json({
                success: true,
                data: systemInfo
            });
        } catch (error) {
            this.logger.error('System status ophalen mislukt', { error });
            res.status(500).json({
                success: false,
                error: 'System status ophalen mislukt'
            });
        }
    };
}
