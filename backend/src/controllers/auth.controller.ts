import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto, Verify2FADto } from '../types/auth.types';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data: RegisterDto = {
        ...req.body,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip
      };
      const result = await authService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const data: VerifyEmailDto = req.body;
      const result = await authService.verifyEmail(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: LoginDto = {
        ...req.body,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip
      };
      const result = await authService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await authService.requestPasswordReset(email);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const data: ResetPasswordDto = req.body;
      const result = await authService.resetPassword(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async enable2FA(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Niet geauthenticeerd' });
      }

      const result = await authService.enable2FA(req.user.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async verify2FA(req: Request, res: Response) {
    try {
      const data: Verify2FADto = {
        ...req.body,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip
      };
      const result = await authService.verify2FA(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Niet geauthenticeerd' });
      }

      res.status(200).json({ user: req.user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Niet geauthenticeerd' });
      }

      // Verwijder de huidige sessie
      const sessionToken = req.headers.authorization?.split(' ')[1];
      if (sessionToken) {
        await prisma.session.delete({
          where: {
            token: sessionToken
          }
        });
      }

      res.status(200).json({ message: 'Succesvol uitgelogd' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
