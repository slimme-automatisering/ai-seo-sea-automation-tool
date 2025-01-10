export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface RegisterDto extends LoginDto {
  name: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  temp?: boolean;
}

export interface VerifyEmailDto {
  token: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface Enable2FADto {
  secret: string;
  otpAuthUrl: string;
}

export interface Verify2FADto {
  userId: string;
  token: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface SessionInfo {
  id: string;
  userAgent?: string;
  ipAddress?: string;
  lastActivity: Date;
  createdAt: Date;
}
