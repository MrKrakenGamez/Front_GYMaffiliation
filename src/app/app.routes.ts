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
      import('./layout/main-layout/main-layout').then(
        (m) => m.MainLayoutComponent,
      ),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // {
      //   path: 'dashboard',
      //   loadComponent: () =>
      //     import('./features/dashboard/dashboard-placeholder/dashboard-placeholder').then(
      //       (m) => m.DashboardPlaceholderComponent,
      //     ),
      //   title: 'Dashboard — GymAffiliate Manager',
      // }
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard').then(
            (m) => m.DashboardComponent,
          ),
        title: 'Dashboard — GymAffiliate Manager',
      },
      {
        path: 'affiliates',
        loadChildren: () =>
          import('./features/affiliates/affiliates.routes').then(
            (m) => m.AFFILIATES_ROUTES,
          ),
      },
      {
        path: 'memberships/assign',
        loadComponent: () =>
          import('./features/memberships/membership-manage/membership-manage').then(
            (m) => m.MembershipManageComponent,
          ),
        title: 'Membresías — GymAffiliate Manager',
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
