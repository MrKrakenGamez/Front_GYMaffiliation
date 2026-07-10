import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { ToastContainerComponent } from '../../shared/components/toast-container/toast-container';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ToastContainerComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent {
  sidebarCollapsed = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }
}