import client, { Registry, Counter, Histogram, Gauge } from 'prom-client';
import { ConfigService } from '../config/ConfigService';

export class MetricsService {
    private registry: Registry;
    private config: ConfigService;

    // Metrics
    private requestCounter: Counter;
    private requestDuration: Histogram;
    private errorCounter: Counter;
    private activeUsers: Gauge;
    private cpuUsage: Gauge;
    private memoryUsage: Gauge;

    constructor(config: ConfigService) {
        this.config = config;
        this.registry = new Registry();
        this.initializeMetrics();
    }

    private initializeMetrics() {
        // Standaard metrics verzamelen
        client.collectDefaultMetrics({ register: this.registry });

        // Request counter
        this.requestCounter = new Counter({
            name: 'http_requests_total',
            help: 'Totaal aantal HTTP requests',
            labelNames: ['method', 'path', 'status']
        });

        // Request duration
        this.requestDuration = new Histogram({
            name: 'http_request_duration_seconds',
            help: 'HTTP request latency in seconden',
            labelNames: ['method', 'path', 'status'],
            buckets: [0.1, 0.5, 1, 2, 5]
        });

        // Error counter
        this.errorCounter = new Counter({
            name: 'application_errors_total',
            help: 'Totaal aantal applicatie errors',
            labelNames: ['type', 'code']
        });

        // Active users gauge
        this.activeUsers = new Gauge({
            name: 'active_users',
            help: 'Aantal actieve gebruikers'
        });

        // CPU usage gauge
        this.cpuUsage = new Gauge({
            name: 'cpu_usage_percent',
            help: 'CPU gebruik in percentage'
        });

        // Memory usage gauge
        this.memoryUsage = new Gauge({
            name: 'memory_usage_bytes',
            help: 'Memory gebruik in bytes'
        });

        // Registreer alle metrics
        this.registry.registerMetric(this.requestCounter);
        this.registry.registerMetric(this.requestDuration);
        this.registry.registerMetric(this.errorCounter);
        this.registry.registerMetric(this.activeUsers);
        this.registry.registerMetric(this.cpuUsage);
        this.registry.registerMetric(this.memoryUsage);
    }

    // Request tracking
    public trackRequest(method: string, path: string, status: number, duration: number) {
        this.requestCounter.inc({ method, path, status });
        this.requestDuration.observe({ method, path, status }, duration);
    }

    // Error tracking
    public trackError(type: string, code: string) {
        this.errorCounter.inc({ type, code });
    }

    // Active users tracking
    public setActiveUsers(count: number) {
        this.activeUsers.set(count);
    }

    // System metrics tracking
    public updateSystemMetrics() {
        const cpuUsage = process.cpuUsage();
        const memUsage = process.memoryUsage();

        this.cpuUsage.set((cpuUsage.user + cpuUsage.system) / 1000000); // Convert to seconds
        this.memoryUsage.set(memUsage.heapUsed);
    }

    // Custom business metrics
    public trackBusinessMetric(name: string, value: number, labels: object = {}) {
        const metric = new Gauge({
            name: `business_metric_${name}`,
            help: `Business metric: ${name}`,
            labelNames: Object.keys(labels)
        });

        this.registry.registerMetric(metric);
        metric.set(labels, value);
    }

    // Get all metrics voor Prometheus
    public async getMetrics(): Promise<string> {
        return this.registry.metrics();
    }

    // Reset alle metrics
    public resetMetrics() {
        this.registry.clear();
        this.initializeMetrics();
    }
}
