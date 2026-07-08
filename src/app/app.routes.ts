// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent),
    title: 'Iniciar sesión — GymAffiliate',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then((m) => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard-placeholder/dashboard-placeholder').then(
            (m) => m.DashboardPlaceholder
          ),
        title: 'Dashboard — GymAffiliate Manager',
      },
      // Próximas fases se agregan aquí como hijos del layout:
      // { path: 'affiliates', loadChildren: ... }
      // { path: 'memberships/assign', ... }
      // { path: 'payments/register', ... }
      // { path: 'access/checkin', ... }
      // { path: 'notifications/expiring', ... }
      // { path: 'reports/income', canActivate: [roleGuard], data: { roles: ['SUPERADMIN','ADMIN'] } }
    ],
  },
  { path: '**', redirectTo: 'login' },
];