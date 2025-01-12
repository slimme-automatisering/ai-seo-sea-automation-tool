import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { authenticator } from 'otplib';
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS, VERIFICATION_TOKEN_EXPIRES, PASSWORD_RESET_TOKEN_EXPIRES } from '../config/constants';
import { LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto, Enable2FADto, Verify2FADto, JwtPayload } from '../types/auth.types';
import { EmailService } from './email.service';

const prisma = new PrismaClient();
const emailService = new EmailService();

export class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Email is al in gebruik');
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        name: data.name,
        verificationToken,
        verificationExpires
      }
    });

    await emailService.sendVerificationEmail(user.email, verificationToken);

    return { id: user.id, email: user.email };
  }

  async verifyEmail(data: VerifyEmailDto) {
    const user = await prisma.user.findFirst({
      where: { 
        verificationToken: data.token,
        verificationExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new Error('Ongeldige of verlopen verificatie token');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationExpires: null
      }
    });

    return { message: 'Email succesvol geverifieerd' };
  }

  async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Geen foutmelding om privacy redenen
      return { message: 'Als dit email adres bestaat, is er een reset link verstuurd' };
    }

    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + PASSWORD_RESET_TOKEN_EXPIRES);

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        resetPasswordToken,
        resetPasswordExpires
      }
    });

    await emailService.sendPasswordResetEmail(email, resetPasswordToken);

    return { message: 'Reset link is verstuurd' };
  }

  async resetPassword(data: ResetPasswordDto) {
    const user = await prisma.user.findFirst({
      where: { 
        resetPasswordToken: data.token,
        resetPasswordExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new Error('Ongeldige of verlopen reset token');
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    return { message: 'Wachtwoord succesvol gereset' };
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user || !user.emailVerified) {
      throw new Error('Ongeldige inloggegevens');
    }

    if (!user.passwordHash) {
      throw new Error('Wachtwoord niet ingesteld');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Ongeldige inloggegevens');
    }

    if (user.twoFactorEnabled) {
      if (!data.token2FA) {
        throw new Error('2FA token vereist');
      }

      const isValid = authenticator.verify({
        token: data.token2FA,
        secret: user.twoFactorSecret!
      });

      if (!isValid) {
        throw new Error('Ongeldige 2FA token');
      }
    }

    const token = this.generateToken(user);
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  async enable2FA(userId: string): Promise<Enable2FADto> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Gebruiker niet gevonden');
    }

    const secret = authenticator.generateSecret();
    const backupCodes = this.generateBackupCodes();

    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret,
        backupCodes,
        twoFactorEnabled: false
      }
    });

    const qrCode = authenticator.keyuri(user.email, 'AI SEO/SEA Tool', secret);

    return {
      secret,
      qrCode,
      backupCodes
    };
  }

  async verify2FA(data: Verify2FADto) {
    const user = await prisma.user.findUnique({
      where: { id: data.userId }
    });

    if (!user || !user.twoFactorSecret) {
      throw new Error('Gebruiker niet gevonden of 2FA niet ingesteld');
    }

    const isValid = authenticator.verify({
      token: data.token,
      secret: user.twoFactorSecret
    });

    if (!isValid) {
      // Check backup codes
      const backupCodeIndex = user.backupCodes.indexOf(data.token);
      if (backupCodeIndex === -1) {
        throw new Error('Ongeldige verificatie code');
      }

      // Remove used backup code
      const updatedBackupCodes = [...user.backupCodes];
      updatedBackupCodes.splice(backupCodeIndex, 1);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          backupCodes: updatedBackupCodes
        }
      });
    }

    if (!user.twoFactorEnabled) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorEnabled: true
        }
      });
    }

    const token = this.generateToken(user);
    return { token };
  }

  private generateToken(user: any): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      codes.push(crypto.randomBytes(4).toString('hex'));
    }
    return codes;
  }
}
