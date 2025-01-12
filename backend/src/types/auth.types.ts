import { z } from 'zod';

// Validatie schemas
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  token2FA: z.string().optional()
});

export const verifyEmailSchema = z.object({
  token: z.string()
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8)
});

export const enable2FASchema = z.object({
  userId: z.string()
});

export const verify2FASchema = z.object({
  userId: z.string(),
  token: z.string()
});

// Types
export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type VerifyEmailDto = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type Enable2FADto = {
  secret: string;
  qrCode: string;
  backupCodes: string[];
};
export type Verify2FADto = z.infer<typeof verify2FASchema>;

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  temp?: boolean;
}

export interface SessionInfo {
  id: string;
  userAgent?: string;
  ipAddress?: string;
  lastActivity: Date;
  createdAt: Date;
}
