import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { CORS_OPTIONS, RATE_LIMIT } from './config/constants';

// Routes
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware
app.use(cors(CORS_OPTIONS));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimit(RATE_LIMIT));

// Health check
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'AI SEO/SEA Automation Tool API' });
});

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Er is een interne serverfout opgetreden' });
});

const PORT = parseInt(process.env.PORT || '4000', 10);

export const startServer = async () => {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server draait op poort ${PORT}`);
    });
  } catch (error) {
    console.error('Server opstartfout:', error);
    throw error;
  }
};

export default app;
