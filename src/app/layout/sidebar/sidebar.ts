import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';

interface NavItem {
  label: string;
  description: string;
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
    {
      label: 'Dashboard',
      description: 'Resumen general del sistema',
      icon: 'bi-speedometer2',
      route: '/dashboard',
    },
    {
      label: 'Afiliados',
      description: 'Administrar afiliados registrados',
      icon: 'bi-people-fill',
      route: '/affiliates',
    },
    {
      label: 'Membresías',
      description: 'Asignar y administrar membresías',
      icon: 'bi-card-checklist',
      route: '/memberships/assign',
    },
    {
      label: 'Pagos',
      description: '',
      icon: 'bi-cash-coin',
      route: '/payments/register',
    },
    {
      label: 'Control de Acceso',
      description: '',
      icon: 'bi-door-open-fill',
      route: '/access/checkin',
    },
    {
      label: 'Notificaciones',
      description: '',
      icon: 'bi-bell-fill',
      route: '/notifications/expiring',
    },
    {
      label: 'Reportes',
      description: '',
      icon: 'bi-bar-chart-fill',
      route: '/reports/income',
      roles: ['SUPERADMIN', 'ADMIN'],
    },
  ];

  visibleItems(): NavItem[] {
    return this.navItems.filter(
      (item) => !item.roles || this.authService.hasRole(...item.roles),
    );
  }
}
