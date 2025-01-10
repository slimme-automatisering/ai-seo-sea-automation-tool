export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = '24h';
export const SALT_ROUNDS = 10;

export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minuten
  max: 100 // maximaal 100 requests per windowMs
};

export const CORS_OPTIONS = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};
