interface Config {
  env: string;
  port: number;
  logLevel: string;
  jwtSecret: string;
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  database: {
    url: string;
  };
  api: {
    rateLimit: {
      windowMs: number;
      max: number;
    };
  };
}

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mydb'
  },
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  }
};
