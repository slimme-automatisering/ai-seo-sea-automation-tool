import { PrismaClient } from '@prisma/client';
import { Logger } from './logger';

const logger = new Logger('PrismaClient');

// Create Prisma Client instance
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Log queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e: any) => {
    logger.debug('Prisma Query', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`
    });
  });
}

// Log errors
prisma.$on('error', (e: any) => {
  logger.error('Prisma Error', {
    message: e.message,
    target: e.target
  });
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('Disconnected from database');
});

export default prisma;
