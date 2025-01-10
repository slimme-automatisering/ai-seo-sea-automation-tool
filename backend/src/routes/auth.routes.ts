import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken, authenticate2FA } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

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
