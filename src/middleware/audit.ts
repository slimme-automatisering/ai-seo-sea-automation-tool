import { NextFunction, Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';

// Logger configuratie
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'audit.log' })
  ]
});

// Audit logging middleware
export const auditMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Request timestamp
  const startTime = Date.now();
  
  // Log bij response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info('API Request', {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      userId: req.user?.id,
      requestId: req.headers['x-request-id'],
    });
  });
  
  next();
};

// Security event logging
export const logSecurityEvent = (
  eventType: string,
  details: Record<string, any>
) => {
  logger.warn('Security Event', {
    timestamp: new Date().toISOString(),
    eventType,
    ...details,
  });
};

// Compliance logging
export const logComplianceEvent = (
  eventType: string,
  details: Record<string, any>
) => {
  logger.info('Compliance Event', {
    timestamp: new Date().toISOString(),
    eventType,
    ...details,
  });
};

// Data access logging
export const logDataAccess = (
  operation: string,
  details: Record<string, any>
) => {
  logger.info('Data Access', {
    timestamp: new Date().toISOString(),
    operation,
    ...details,
  });
};

// Error logging
export const logError = (
  error: Error,
  details: Record<string, any>
) => {
  logger.error('Application Error', {
    timestamp: new Date().toISOString(),
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    ...details,
  });
};
