import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private resolveFn: ((value: boolean) => void) | null = null;

  visible = signal(false);
  title = signal('Confirmar acción');
  message = signal('');

  confirm(message: string, title = 'Confirmar acción'): Promise<boolean> {
    this.title.set(title);
    this.message.set(message);
    this.visible.set(true);
    return new Promise<boolean>((resolve) => {
      this.resolveFn = resolve;
    });
  }

  respond(result: boolean): void {
    this.visible.set(false);
    this.resolveFn?.(result);
    this.resolveFn = null;
  }
}