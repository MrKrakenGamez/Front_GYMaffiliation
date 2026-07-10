import { Component, inject } from '@angular/core';
import { ConfirmationService } from '../../services/confirmation';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  template: `
    @if (confirmationService.visible()) {
      <div class="dialog-backdrop d-flex align-items-center justify-content-center">
        <div class="glassmorphism p-4" style="width: 90%; max-width: 400px;">
          <h5 class="text-gold mb-3">{{ confirmationService.title() }}</h5>
          <p class="mb-4">{{ confirmationService.message() }}</p>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-outline-light btn-sm" (click)="confirmationService.respond(false)">
              Cancelar
            </button>
            <button class="btn btn-sm text-white" style="background:#FF4444;" (click)="confirmationService.respond(true)">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 10, 0.75);
      z-index: 1085;
    }
  `],
})
export class ConfirmationDialogComponent {
  confirmationService = inject(ConfirmationService);
}