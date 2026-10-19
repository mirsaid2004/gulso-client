import { Role } from "./enums";

export interface SendOtpRequest {
  phone: string;
}

export interface LoginWithOtpRequest {
  phone: string;
  otpCode: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface DeleteAccountRequest {
  otpCode: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  name: string;
  roles: Role[];
}
