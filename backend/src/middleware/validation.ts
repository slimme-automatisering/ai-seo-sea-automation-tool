import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import xss from 'xss';

// Validatie middleware
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Voer alle validaties uit
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check resultaten
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

// XSS sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Sanitize body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  // Sanitize URL parameters
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

// Helper functie voor recursive object sanitization
const sanitizeObject = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? xss(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeObject(value);
  }

  return sanitized;
};

// SQL injectie preventie
export const preventSqlInjection = (value: string): boolean => {
  const sqlPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)|(['"])/gi;
  return !sqlPattern.test(value);
};

// Input validatie regels
export const validationRules = {
  // Gebruiker validatie
  user: {
    email: {
      in: ['body'],
      isEmail: true,
      normalizeEmail: true,
      trim: true,
    },
    password: {
      in: ['body'],
      isLength: { min: 8 },
      matches: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    },
  },

  // API key validatie
  apiKey: {
    in: ['headers'],
    isString: true,
    notEmpty: true,
    isLength: { min: 32, max: 32 },
  },

  // URL validatie
  url: {
    in: ['body'],
    isURL: true,
    trim: true,
  },

  // Numerieke waarde validatie
  number: {
    in: ['body'],
    isNumeric: true,
    toFloat: true,
  },

  // Boolean validatie
  boolean: {
    in: ['body'],
    isBoolean: true,
    toBoolean: true,
  },

  // Datum validatie
  date: {
    in: ['body'],
    isISO8601: true,
    toDate: true,
  },
};

// Content-Type validatie
export const validateContentType = (
  allowedTypes: string[]
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.headers['content-type'];
    
    if (!contentType || !allowedTypes.includes(contentType)) {
      return res.status(415).json({
        error: 'Ongeldig Content-Type',
        allowedTypes,
      });
    }
    
    next();
  };
};
