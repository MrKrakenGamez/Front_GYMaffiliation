// src/app/shared/components/loading-spinner/loading-spinner.component.ts

import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {
      <div class="loading-overlay">
        <div class="spinner-border" style="color: #00D4FF; width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 10, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1090;
    }
  `],
})
export class LoadingSpinnerComponent {
  loadingService = inject(LoadingService);
}