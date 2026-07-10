import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests = signal(0);
  readonly isLoading = signal(false);

  show(): void {
    this.activeRequests.update((n) => n + 1);
    this.isLoading.set(true);
  }

  hide(): void {
    this.activeRequests.update((n) => Math.max(0, n - 1));
    if (this.activeRequests() === 0) this.isLoading.set(false);
  }
}