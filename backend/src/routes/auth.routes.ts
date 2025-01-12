import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import type { Request, Response } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as path from 'path';

const router = Router();
const authController = new AuthController();

// Laad OpenAPI specificatie
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi/auth.yaml'));

// API documentatie
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

// API informatie
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Auth API endpoints',
    documentation: '/api/auth/docs',
    endpoints: {
      public: {
        register: 'POST /api/auth/register',
        verifyEmail: 'POST /api/auth/verify-email',
        login: 'POST /api/auth/login',
        requestPasswordReset: 'POST /api/auth/request-password-reset',
        resetPassword: 'POST /api/auth/reset-password',
        verify2FA: 'POST /api/auth/verify-2fa'
      },
      protected: {
        profile: 'GET /api/auth/profile',
        enable2FA: 'POST /api/auth/enable-2fa',
        logout: 'POST /api/auth/logout'
      }
    }
  });
});

// Publieke routes
router.post('/register', authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-2fa', authController.verify2FA);

// Beveiligde routes (token vereist)
router.get('/profile', authenticateToken, authController.getProfile);
router.post('/enable-2fa', authenticateToken, authController.enable2FA);
router.post('/logout', authenticateToken, authController.logout);

export default router;
