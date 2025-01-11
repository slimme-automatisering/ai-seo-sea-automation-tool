import compression from 'compression';
import { Request, Response } from 'express';

// Configureer compressie middleware
export const compressionMiddleware = compression({
  // Alleen comprimeren als response groter is dan 1KB
  threshold: 1024,
  
  // Gebruik Brotli als beschikbaar, anders gzip
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    
    // Standaard compression filter
    return compression.filter(req, res);
  },
  
  // Configureer Brotli compressie level
  // Level 4 is een goede balans tussen compressie en snelheid
  level: 4,
  
  // Configureer welke content types gecomprimeerd moeten worden
  contentType: [
    'text/plain',
    'text/html',
    'text/css',
    'text/javascript',
    'application/javascript',
    'application/json',
    'application/x-javascript',
    'application/xml',
    'application/xml+rss',
    'application/x-httpd-php',
    'image/svg+xml'
  ]
});
