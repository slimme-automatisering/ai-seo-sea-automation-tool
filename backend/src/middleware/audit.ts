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

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

interface AuditLog {
  timestamp: Date;
  userId?: string;
  action: string;
  resource: string;
  status: number;
  ip: string;
  userAgent: string;
}

// Audit logging middleware
export const auditMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Capture original end function
  const originalEnd = res.end;
  const chunks: Buffer[] = [];

  // Override end function
  res.end = function(chunk: any) {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }

    const auditLog: AuditLog = {
      timestamp: new Date(),
      userId: req.user?.id,
      action: req.method,
      resource: req.originalUrl,
      status: res.statusCode,
      ip: req.ip,
      userAgent: req.get('user-agent') || 'unknown'
    };

    // Log audit entry
    logger.info('API Request', auditLog);

    // Restore original end
    originalEnd.apply(res, arguments);
  };

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
