import Queue from 'bull';
import { logger } from './logger';
import { redis } from './redis';

// Queue configuratie voor verschillende job types
export const Queues = {
  // SEO gerelateerde taken
  seoAudit: new Queue('seo-audit', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
    },
  }),

  // Content generatie taken
  contentGeneration: new Queue('content-generation', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
    defaultJobOptions: {
      attempts: 2,
      timeout: 300000, // 5 minuten timeout
      removeOnComplete: true,
    },
  }),

  // Analytics taken
  analytics: new Queue('analytics', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: 100, // Bewaar laatste 100 completed jobs
    },
  }),

  // Email notificaties
  emailNotification: new Queue('email-notification', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'fixed',
        delay: 5000,
      },
      removeOnComplete: true,
    },
  }),
};

// Error handling voor alle queues
Object.values(Queues).forEach(queue => {
  queue.on('error', error => {
    logger.error(`Queue error in ${queue.name}:`, error);
  });

  queue.on('failed', (job, error) => {
    logger.error(`Job failed in ${queue.name}:`, {
      jobId: job.id,
      error: error.message,
    });
  });

  queue.on('completed', job => {
    logger.info(`Job completed in ${queue.name}:`, {
      jobId: job.id,
    });
  });
});

// Helper functies voor job management
export const addJob = async (
  queueName: keyof typeof Queues,
  data: any,
  options?: Queue.JobOptions
) => {
  try {
    const queue = Queues[queueName];
    const job = await queue.add(data, options);
    return job;
  } catch (error) {
    logger.error(`Error adding job to ${queueName}:`, error);
    throw error;
  }
};

export const getJobStatus = async (
  queueName: keyof typeof Queues,
  jobId: string
) => {
  try {
    const queue = Queues[queueName];
    const job = await queue.getJob(jobId);
    
    if (!job) {
      return { status: 'not_found' };
    }
    
    const state = await job.getState();
    const progress = await job.progress();
    
    return {
      id: job.id,
      status: state,
      progress,
      data: job.data,
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
      timestamp: job.timestamp,
    };
  } catch (error) {
    logger.error(`Error getting job status from ${queueName}:`, error);
    throw error;
  }
};

// Recurring jobs setup
export const setupRecurringJobs = async () => {
  try {
    // Dagelijkse SEO audit voor alle websites
    await Queues.seoAudit.add(
      'daily-audit',
      {},
      {
        repeat: {
          cron: '0 0 * * *', // Elke dag om middernacht
        },
      }
    );

    // Hourly analytics update
    await Queues.analytics.add(
      'hourly-update',
      {},
      {
        repeat: {
          cron: '0 * * * *', // Elk uur
        },
      }
    );

    // Weekly competitor analysis
    await Queues.analytics.add(
      'competitor-analysis',
      {},
      {
        repeat: {
          cron: '0 0 * * 0', // Elke zondag
        },
      }
    );

    logger.info('Recurring jobs setup completed');
  } catch (error) {
    logger.error('Error setting up recurring jobs:', error);
    throw error;
  }
};

// Graceful shutdown
export const closeQueues = async () => {
  try {
    await Promise.all(
      Object.values(Queues).map(queue => queue.close())
    );
    logger.info('All queues closed successfully');
  } catch (error) {
    logger.error('Error closing queues:', error);
    throw error;
  }
};
