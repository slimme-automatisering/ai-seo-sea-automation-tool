export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  name: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
