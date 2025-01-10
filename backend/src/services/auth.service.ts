import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { authenticator } from 'otplib';
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS, VERIFICATION_TOKEN_EXPIRES, PASSWORD_RESET_TOKEN_EXPIRES } from '../config/constants';
import { LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto, Enable2FADto, Verify2FADto } from '../types/auth.types';
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
        password: hashedPassword,
        name: data.name,
        verificationToken,
        verificationExpires
      }
    });

    // Stuur verificatie email
    await emailService.sendVerificationEmail(user.email, verificationToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      message: 'Registratie succesvol. Controleer uw email om uw account te verifiëren.'
    };
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

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Gebruiker niet gevonden');
    }

    if (!user.emailVerified) {
      throw new Error('Email is nog niet geverifieerd');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) {
      throw new Error('Ongeldig wachtwoord');
    }

    // Als 2FA is ingeschakeld, genereer een tijdelijke token
    if (user.twoFactorEnabled) {
      const tempToken = this.generateTempToken(user);
      return {
        tempToken,
        requires2FA: true
      };
    }

    // Maak een nieuwe sessie aan
    const token = await this.createSession(user, data.userAgent, data.ipAddress);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    };
  }

  async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Gebruiker niet gevonden');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + PASSWORD_RESET_TOKEN_EXPIRES);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires
      }
    });

    // Stuur wachtwoord reset email
    await emailService.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'Wachtwoord reset instructies zijn verzonden naar uw email' };
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

    const hashedPassword = await bcrypt.hash(data.newPassword, SALT_ROUNDS);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    return { message: 'Wachtwoord succesvol gewijzigd' };
  }

  async enable2FA(userId: string): Promise<Enable2FADto> {
    const secret = authenticator.generateSecret();
    const backupCodes = this.generateBackupCodes();
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret,
        backupCodes: backupCodes
      }
    });

    // Stuur backup codes naar de gebruiker
    await emailService.send2FABackupCodes(user.email, backupCodes);

    const otpAuthUrl = authenticator.keyuri(userId, 'AI SEO/SEA Tool', secret);

    return {
      secret,
      otpAuthUrl
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
      // Controleer of het een backup code is
      if (user.backupCodes?.includes(data.token)) {
        // Verwijder de gebruikte backup code
        await prisma.user.update({
          where: { id: user.id },
          data: {
            backupCodes: user.backupCodes.filter(code => code !== data.token)
          }
        });
      } else {
        throw new Error('Ongeldige 2FA code');
      }
    }

    if (!user.twoFactorEnabled) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorEnabled: true
        }
      });
    }

    const token = await this.createSession(user, data.userAgent, data.ipAddress);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    };
  }

  private async createSession(user: any, userAgent?: string, ipAddress?: string) {
    const token = this.generateToken(user);
    const expiresAt = new Date(Date.now() + parseInt(JWT_EXPIRES_IN) * 1000);

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        userAgent,
        ipAddress,
        expiresAt
      }
    });

    return token;
  }

  private generateToken(user: any) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  private generateTempToken(user: any) {
    return jwt.sign(
      {
        userId: user.id,
        temp: true
      },
      JWT_SECRET,
      { expiresIn: '5m' }
    );
  }

  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      codes.push(crypto.randomBytes(4).toString('hex'));
    }
    return codes;
  }
}
