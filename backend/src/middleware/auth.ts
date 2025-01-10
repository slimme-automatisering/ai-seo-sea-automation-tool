import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Logger } from '../utils/Logger';

const logger = new Logger('AuthMiddleware');

export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: 'Geen autorisatie token gevonden'
            });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'default_secret';

        try {
            const decoded = verify(token, secret);
            req.user = decoded;
            next();
        } catch (error) {
            logger.error('Invalid token:', error);
            return res.status(401).json({
                success: false,
                error: 'Ongeldige autorisatie token'
            });
        }
    } catch (error) {
        logger.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            error: 'Er is een fout opgetreden bij de authenticatie'
        });
    }
}
