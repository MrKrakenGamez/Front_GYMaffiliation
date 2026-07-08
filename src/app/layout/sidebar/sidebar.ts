// src/app/layout/sidebar/sidebar.component.ts

import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  authService = inject(AuthService);

  collapsed = input(false);

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
    { label: 'Afiliados', icon: 'bi-people-fill', route: '/affiliates' },
    { label: 'Membresías', icon: 'bi-card-checklist', route: '/memberships/assign' },
    { label: 'Pagos', icon: 'bi-cash-coin', route: '/payments/register' },
    { label: 'Control de Acceso', icon: 'bi-door-open-fill', route: '/access/checkin' },
    { label: 'Notificaciones', icon: 'bi-bell-fill', route: '/notifications/expiring' },
    {
      label: 'Reportes',
      icon: 'bi-bar-chart-fill',
      route: '/reports/income',
      roles: ['SUPERADMIN', 'ADMIN'],
    },
  ];

  visibleItems(): NavItem[] {
    return this.navItems.filter(
      (item) => !item.roles || this.authService.hasRole(...item.roles)
    );
  }
}