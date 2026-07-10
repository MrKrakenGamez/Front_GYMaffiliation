import { Component } from '@angular/core';

/**
 * TEMPORAL — Placeholder de Fase 0.
 * Se reemplaza por completo en Fase 3 (Dashboard real).
 */
@Component({
  selector: 'app-dashboard-placeholder',
  standalone: true,
  template: `
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="neomorphic p-5 text-center" style="max-width: 480px;">
        <h1 class="text-electric-blue mb-3">
          <i class="bi bi-check-circle-fill"></i>
        </h1>
        <h2 class="mb-2">GymAffiliate Manager</h2>
        <p class="text-gold mb-4">Fase 1 — Layout y Autenticación ✅</p>
        <p class="text-white-50 mb-0">
          Sesión iniciada correctamente. Este dashboard temporal
          se reemplaza en Fase 3.
        </p>
      </div>
    </div>
  `,
})
export class DashboardPlaceholderComponent {}