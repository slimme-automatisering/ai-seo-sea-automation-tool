import { startServer } from './server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Test de database connectie
    await prisma.$connect();
    console.log('Database verbinding succesvol');

    // Start de server
    await startServer();
  } catch (error) {
    console.error('Opstartfout:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
