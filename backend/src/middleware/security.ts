import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Logger } from '../utils/Logger';

const logger = new Logger('SecurityMiddleware');

// CORS configuratie
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400 // 24 uur
};

// CSP configuratie
const cspOptions = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.openai.com', 'https://api.semrush.com', 'https://api.ahrefs.com'],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
    }
};

// Security headers middleware
export const securityHeaders = [
    // Basis security headers
    helmet(),
    
    // CORS
    cors(corsOptions),
    
    // Content Security Policy
    helmet.contentSecurityPolicy(cspOptions),
    
    // Voorkom clickjacking
    helmet.frameguard({ action: 'deny' }),
    
    // XSS protection
    helmet.xssFilter(),
    
    // Voorkom MIME type sniffing
    helmet.noSniff(),
    
    // HSTS
    helmet.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }),
    
    // Verberg powered-by header
    helmet.hidePoweredBy(),
    
    // Voorkom IE van het uitvoeren van downloads in context van site
    helmet.ieNoOpen(),
    
    // DNS prefetch control
    helmet.dnsPrefetchControl({ allow: false })
];

// Request sanitization middleware
export const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Sanitize body
        if (req.body) {
            Object.keys(req.body).forEach(key => {
                if (typeof req.body[key] === 'string') {
                    req.body[key] = sanitizeString(req.body[key]);
                }
            });
        }

        // Sanitize query parameters
        if (req.query) {
            Object.keys(req.query).forEach(key => {
                if (typeof req.query[key] === 'string') {
                    req.query[key] = sanitizeString(req.query[key] as string);
                }
            });
        }

        // Sanitize URL parameters
        if (req.params) {
            Object.keys(req.params).forEach(key => {
                if (typeof req.params[key] === 'string') {
                    req.params[key] = sanitizeString(req.params[key]);
                }
            });
        }

        next();
    } catch (error) {
        logger.error('Error sanitizing request:', error);
        res.status(400).json({
            success: false,
            error: 'Ongeldige input gedetecteerd'
        });
    }
};

// SQL injection prevention middleware
export const preventSqlInjection = (req: Request, res: Response, next: NextFunction) => {
    try {
        const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/i;
        
        const checkForSqlInjection = (value: string): boolean => {
            return sqlInjectionPattern.test(value);
        };

        // Check body
        if (req.body) {
            Object.values(req.body).forEach(value => {
                if (typeof value === 'string' && checkForSqlInjection(value)) {
                    throw new Error('SQL injection gedetecteerd');
                }
            });
        }

        // Check query parameters
        if (req.query) {
            Object.values(req.query).forEach(value => {
                if (typeof value === 'string' && checkForSqlInjection(value)) {
                    throw new Error('SQL injection gedetecteerd');
                }
            });
        }

        // Check URL parameters
        if (req.params) {
            Object.values(req.params).forEach(value => {
                if (typeof value === 'string' && checkForSqlInjection(value)) {
                    throw new Error('SQL injection gedetecteerd');
                }
            });
        }

        next();
    } catch (error) {
        logger.error('SQL injection attempt detected:', error);
        res.status(400).json({
            success: false,
            error: 'Ongeldige input gedetecteerd'
        });
    }
};

// Helper functie voor string sanitization
function sanitizeString(str: string): string {
    return str
        .replace(/[<>]/g, '') // Verwijder HTML tags
        .replace(/['"]/g, '') // Verwijder quotes
        .trim(); // Verwijder whitespace
}
