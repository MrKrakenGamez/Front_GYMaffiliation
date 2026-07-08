// src/app/core/guards/role.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * Uso en rutas:
 *   { path: 'reports', canActivate: [roleGuard], data: { roles: ['SUPERADMIN','ADMIN'] } }
 */
export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = (route.data['roles'] as string[]) ?? [];
  if (allowedRoles.length === 0 || authService.hasRole(...allowedRoles)) return true;

  return router.createUrlTree(['/dashboard']);
};