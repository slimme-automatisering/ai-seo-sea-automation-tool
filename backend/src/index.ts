import { startServer } from './server';

// Start de server
startServer().catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
});
