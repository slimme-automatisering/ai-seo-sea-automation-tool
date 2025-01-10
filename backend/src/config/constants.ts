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

// Email configuratie
export const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
export const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587');
export const EMAIL_USER = process.env.EMAIL_USER || '';
export const EMAIL_PASS = process.env.EMAIL_PASS || '';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Token expiratie tijden
export const VERIFICATION_TOKEN_EXPIRES = 24 * 60 * 60 * 1000; // 24 uur
export const PASSWORD_RESET_TOKEN_EXPIRES = 60 * 60 * 1000; // 1 uur
export const SESSION_EXPIRES = 7 * 24 * 60 * 60 * 1000; // 7 dagen
