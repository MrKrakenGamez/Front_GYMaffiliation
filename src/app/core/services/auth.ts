// src/app/core/services/auth.service.ts

import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';
import { STORAGE_KEYS } from '../constants/storage-keys.constants';
import { ApiResponse } from '../models/api-response.model';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  UsuarioInfo,
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signal con el usuario actual (null = no autenticado)
  private currentUserSignal = signal<UsuarioInfo | null>(this.readUserFromStorage());
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  login(request: LoginRequest): Observable<boolean> {
    return this.http
      .post<ApiResponse<LoginResponse>>(
        `${environment.apiUrl}/${API_ENDPOINTS.AUTH.LOGIN}`,
        request
      )
      .pipe(
        map((res) => {
          if (!res.success || !res.data) return false;
          this.persistSession(res.data);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  refresh(): Observable<boolean> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) return of(false);

    return this.http
      .post<ApiResponse<RefreshTokenResponse>>(
        `${environment.apiUrl}/${API_ENDPOINTS.AUTH.REFRESH}`,
        { refreshToken }
      )
      .pipe(
        map((res) => {
          if (!res.success || !res.data) return false;
          this.persistTokens(res.data);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout(logoutAll = false): void {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const userId = this.currentUserSignal()?.userId ?? null;

    this.http
      .post<ApiResponse<unknown>>(`${environment.apiUrl}/${API_ENDPOINTS.AUTH.LOGOUT}`, {
        refreshToken,
        userId,
        logoutAll,
      })
      .pipe(catchError(() => of(null)))
      .subscribe(() => this.clearSession());
  }

  /** Logout inmediato en cliente, sin esperar respuesta del server (usado por el interceptor si el refresh falla) */
  forceLocalLogout(): void {
    this.clearSession();
  }

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  hasRole(...roles: string[]): boolean {
    const role = this.currentUserSignal()?.roleCode;
    return !!role && roles.includes(role);
  }

  // ── privados ──────────────────────────────────────────────────────────
  private persistSession(data: LoginResponse): void {
    this.persistTokens(data);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.usuario));
    this.currentUserSignal.set(data.usuario);
  }

  private persistTokens(data: RefreshTokenResponse): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRY, data.accessTokenExpiry);
  }

  private clearSession(): void {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  private readUserFromStorage(): UsuarioInfo | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? (JSON.parse(raw) as UsuarioInfo) : null;
  }
}