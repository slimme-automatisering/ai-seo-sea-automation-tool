import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { format } from 'winston';
import { ConfigService } from '../config/ConfigService';

export class LoggingService {
    private logger: winston.Logger;
    private config: ConfigService;

    constructor(config: ConfigService) {
        this.config = config;
        this.initializeLogger();
    }

    private initializeLogger() {
        const esTransport = new ElasticsearchTransport({
            level: 'info',
            clientOpts: {
                node: this.config.get('ELASTICSEARCH_URL'),
                auth: {
                    username: this.config.get('ELASTICSEARCH_USERNAME'),
                    password: this.config.get('ELASTICSEARCH_PASSWORD')
                }
            },
            indexPrefix: 'seo-tool-logs'
        });

        this.logger = winston.createLogger({
            level: this.config.get('LOG_LEVEL') || 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            defaultMeta: {
                service: 'seo-automation-tool'
            },
            transports: [
                // Console transport voor development
                new winston.transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    )
                }),
                // File transport voor persistente logs
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                }),
                new winston.transports.File({
                    filename: 'logs/combined.log',
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                }),
                // Elasticsearch transport voor log aggregatie
                esTransport
            ]
        });

        // Unhandled rejection handler
        process.on('unhandledRejection', (error: Error) => {
            this.error('Unhandled Promise Rejection', {
                error: error.message,
                stack: error.stack
            });
        });

        // Uncaught exception handler
        process.on('uncaughtException', (error: Error) => {
            this.error('Uncaught Exception', {
                error: error.message,
                stack: error.stack
            });
            process.exit(1);
        });
    }

    public info(message: string, meta: object = {}) {
        this.logger.info(message, {
            timestamp: new Date().toISOString(),
            ...meta
        });
    }

    public error(message: string, meta: object = {}) {
        this.logger.error(message, {
            timestamp: new Date().toISOString(),
            ...meta
        });
    }

    public warn(message: string, meta: object = {}) {
        this.logger.warn(message, {
            timestamp: new Date().toISOString(),
            ...meta
        });
    }

    public debug(message: string, meta: object = {}) {
        this.logger.debug(message, {
            timestamp: new Date().toISOString(),
            ...meta
        });
    }

    public trace(message: string, meta: object = {}) {
        this.logger.silly(message, {
            timestamp: new Date().toISOString(),
            ...meta
        });
    }

    // Methode voor het loggen van security events
    public logSecurityEvent(event: string, meta: object = {}) {
        this.logger.warn(`Security Event: ${event}`, {
            timestamp: new Date().toISOString(),
            type: 'SECURITY',
            ...meta
        });
    }

    // Methode voor het loggen van performance metrics
    public logPerformanceMetric(metric: string, value: number, meta: object = {}) {
        this.logger.info(`Performance Metric: ${metric}`, {
            timestamp: new Date().toISOString(),
            type: 'PERFORMANCE',
            metric,
            value,
            ...meta
        });
    }

    // Methode voor het loggen van business events
    public logBusinessEvent(event: string, meta: object = {}) {
        this.logger.info(`Business Event: ${event}`, {
            timestamp: new Date().toISOString(),
            type: 'BUSINESS',
            ...meta
        });
    }
}
