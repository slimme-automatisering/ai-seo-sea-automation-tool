import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import hpp from 'hpp';
import { expressCspHeader, INLINE, NONE, SELF } from 'express-csp-header';
import sanitize from 'express-mongo-sanitize';

// Rate limiting configuratie
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuten
  max: 100, // max 100 requests per IP
  message: 'Te veel requests van dit IP adres, probeer het later opnieuw',
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuratie
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 600, // 10 minuten
};

// CSP configuratie
const cspConfig = {
  directives: {
    'default-src': [SELF],
    'script-src': [SELF, INLINE],
    'style-src': [SELF, INLINE],
    'img-src': [SELF, 'data:', 'https:'],
    'font-src': [SELF, 'https:', 'data:'],
    'object-src': [NONE],
    'connect-src': [SELF, 'https://api.seo-sea-tool.com'],
  },
};

// Security middleware
export const securityMiddleware = [
  // Basis security headers
  helmet({
    contentSecurityPolicy: false, // We gebruiken express-csp-header
  }),
  
  // CORS
  cors(corsOptions),
  
  // Content Security Policy
  expressCspHeader(cspConfig),
  
  // Parameter pollution bescherming
  hpp(),
  
  // NoSQL injectie bescherming
  sanitize(),
  
  // XSS bescherming
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  },
  
  // Clickjacking bescherming
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  },
  
  // MIME sniffing bescherming
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  },
  
  // HSTS
  (req: Request, res: Response, next: NextFunction) => {
    if (req.secure) {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );
    }
    next();
  },
];

// JWT authenticatie middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Geen token aanwezig' });
    }
    
    // Token verificatie
    const decoded = await verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Ongeldige token' });
  }
};

// Token verificatie functie
const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    throw new Error('Token verificatie mislukt');
  }
};
