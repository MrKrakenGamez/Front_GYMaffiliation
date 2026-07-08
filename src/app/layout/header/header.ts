// src/app/layout/header/header.component.ts

import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  toggleSidebar = output<void>();

  logout(): void {
    this.authService.logout();
  }
}