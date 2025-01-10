import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';
import { JwtPayload } from '../types/auth.types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      session?: any;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Geen toegangstoken gevonden' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Controleer of het een tijdelijke token is voor 2FA
    if (decoded.temp) {
      return res.status(403).json({ message: '2FA verificatie vereist' });
    }

    // Zoek de actieve sessie
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        // Verwijder verlopen sessie
        await prisma.session.delete({
          where: { id: session.id }
        });
      }
      return res.status(401).json({ message: 'Sessie verlopen' });
    }

    // Update laatste activiteit
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivity: new Date() }
    });

    if (!session.user) {
      return res.status(401).json({ message: 'Gebruiker niet gevonden' });
    }

    req.user = decoded;
    req.session = session;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Ongeldig token' });
  }
};

export const authenticate2FA = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Geen toegangstoken gevonden' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    if (!decoded.temp) {
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ message: 'Gebruiker niet gevonden' });
    }

    if (!user.twoFactorEnabled) {
      return next();
    }

    return res.status(403).json({ 
      message: '2FA verificatie vereist',
      requires2FA: true 
    });
  } catch (error) {
    return res.status(403).json({ message: 'Ongeldig token' });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Niet geauthenticeerd' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Onvoldoende rechten' });
    }

    next();
  };
};

export const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session) {
      return res.status(401).json({ message: 'Geen actieve sessie' });
    }

    const currentSession = await prisma.session.findUnique({
      where: { id: req.session.id }
    });

    if (!currentSession || currentSession.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Sessie verlopen' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Sessie validatie mislukt' });
  }
};
