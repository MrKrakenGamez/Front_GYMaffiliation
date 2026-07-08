// src/app/core/models/auth.model.ts

/** Coincide 1:1 con los roles reales en SystemUsers */
export type RoleCode = 'SUPERADMIN' | 'ADMIN' | 'RECEPTION' | 'TRAINER' | 'READONLY';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UsuarioInfo {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  roleCode: RoleCode;
  roleName: string;
  branchId: number | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string; // ISO date
  refreshTokenExpiry: string;
  usuario: UsuarioInfo;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
}