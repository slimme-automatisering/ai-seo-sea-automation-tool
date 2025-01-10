import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { Logger } from '../utils/Logger';

const logger = new Logger('RateLimiterMiddleware');

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuten
    max: 100, // maximaal 100 requests per windowMs
    message: {
        success: false,
        error: 'Te veel requests. Probeer het later opnieuw.'
    },
    handler: (req: Request, res: Response) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            error: 'Te veel requests. Probeer het later opnieuw.'
        });
    },
    standardHeaders: true,
    legacyHeaders: false
});
