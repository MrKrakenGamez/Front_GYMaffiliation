import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [NgClass],   // <-- Agregar aquí
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1080;">
      @for (toast of notificationService.toasts(); track toast.id) {
        <div class="toast show glassmorphism mb-2 border-0"
             [ngClass]="'toast-' + toast.type">
          <div class="d-flex align-items-center justify-content-between p-3">
            <span>{{ toast.message }}</span>
            <button
              class="btn-close btn-close-white ms-3"
              (click)="notificationService.dismiss(toast.id)">
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  notificationService = inject(NotificationService);
}