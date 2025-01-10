import Bull from 'bull';
import { Logger } from './logger';
import redis from './redis';
import { config } from '../config';

const logger = new Logger('Queue');

// Queue interface
interface QueueConfig {
  name: string;
  concurrency?: number;
  attempts?: number;
  backoff?: {
    type: string;
    delay: number;
  };
}

// Queue factory
export class QueueFactory {
  private static queues: Map<string, Bull.Queue> = new Map();

  static createQueue(queueConfig: QueueConfig): Bull.Queue {
    if (this.queues.has(queueConfig.name)) {
      return this.queues.get(queueConfig.name)!;
    }

    const queue = new Bull(queueConfig.name, {
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password
      },
      defaultJobOptions: {
        attempts: queueConfig.attempts || 3,
        backoff: queueConfig.backoff || {
          type: 'exponential',
          delay: 1000
        },
        removeOnComplete: true,
        removeOnFail: false
      }
    });

    // Event handlers
    queue.on('completed', (job) => {
      logger.info(`Job ${job.id} completed in queue ${queueConfig.name}`);
    });

    queue.on('failed', (job, err) => {
      logger.error(`Job ${job?.id} failed in queue ${queueConfig.name}:`, err);
    });

    queue.on('error', (error) => {
      logger.error(`Queue ${queueConfig.name} error:`, error);
    });

    queue.on('stalled', (job) => {
      logger.warn(`Job ${job.id} stalled in queue ${queueConfig.name}`);
    });

    // Set concurrency
    if (queueConfig.concurrency) {
      queue.process(queueConfig.concurrency, async (job) => {
        try {
          logger.info(`Processing job ${job.id} in queue ${queueConfig.name}`);
          return await job.data.handler(job.data);
        } catch (error) {
          logger.error(`Error processing job ${job.id}:`, error);
          throw error;
        }
      });
    }

    this.queues.set(queueConfig.name, queue);
    return queue;
  }

  static async closeAll(): Promise<void> {
    const closePromises = Array.from(this.queues.values()).map(queue => queue.close());
    await Promise.all(closePromises);
    logger.info('All queues closed');
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await QueueFactory.closeAll();
});

// Pre-defined queues
export const contentQueue = QueueFactory.createQueue({
  name: 'content-generation',
  concurrency: 2,
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000
  }
});

export const seoQueue = QueueFactory.createQueue({
  name: 'seo-tasks',
  concurrency: 3,
  attempts: 2,
  backoff: {
    type: 'fixed',
    delay: 5000
  }
});

export const analyticsQueue = QueueFactory.createQueue({
  name: 'analytics-processing',
  concurrency: 1,
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 2000
  }
});
