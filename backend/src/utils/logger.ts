import winston from 'winston';
import { config } from '../config';

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  
  return msg;
});

// Logger configuration
const logger = winston.createLogger({
  level: config.logLevel || 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp(),
      logFormat
    )
  }));
}

export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  info(message: string, meta: any = {}) {
    logger.info(message, { context: this.context, ...meta });
  }

  error(message: string, meta: any = {}) {
    logger.error(message, { context: this.context, ...meta });
  }

  warn(message: string, meta: any = {}) {
    logger.warn(message, { context: this.context, ...meta });
  }

  debug(message: string, meta: any = {}) {
    logger.debug(message, { context: this.context, ...meta });
  }

  verbose(message: string, meta: any = {}) {
    logger.verbose(message, { context: this.context, ...meta });
  }
}

export default logger;
