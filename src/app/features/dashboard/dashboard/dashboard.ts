// src/app/features/dashboard/dashboard/dashboard.component.ts

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../services/dashboard';
import { NotificationService } from '../../../core/services/notification';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card';
import { BarChartComponent, BarChartItem } from '../../../shared/components/bar-chart/bar-chart';
import { AfiliadoEstado, IngresoMensual, Vencimiento } from '../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatCardComponent, BarChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);
  private notificationService = inject(NotificationService);

  ingresos = signal<IngresoMensual[]>([]);
  afiliadosEstado = signal<AfiliadoEstado[]>([]);
  vencimientos = signal<Vencimiento[]>([]);

  totalAfiliadosActivos = computed(
    () =>
      this.afiliadosEstado()
        .filter((a) => a.status.toLowerCase().includes('activo'))
        .reduce((sum, a) => sum + a.total, 0)
  );

  totalIngresosMes = computed(() =>
    this.ingresos().reduce((sum, i) => sum + i.totalRevenue, 0)
  );

  totalIngresosMesStr = computed(()=> this.totalIngresosMes().toString());
  
  ingresosChartData = computed<BarChartItem[]>(() =>
    this.ingresos().map((i) => ({
      label: i.paymentMethod,
      value: i.totalRevenue,
      colorHex: '#00D4FF',
    }))
  );

  ingresosMax = computed(() =>
    Math.max(0, ...this.ingresos().map((i) => i.totalRevenue))
  );

  constructor() {
    const now = new Date();
    this.dashboardService.getIngresos(now.getFullYear(), now.getMonth() + 1).subscribe({
      next: (data) => this.ingresos.set(data),
      error: () => this.notificationService.error('No se pudieron cargar los ingresos del mes.'),
    });

    this.dashboardService.getAfiliadosActivos().subscribe({
      next: (data) => this.afiliadosEstado.set(data),
      error: () => this.notificationService.error('No se pudo cargar el resumen de afiliados.'),
    });

    this.dashboardService.getVencimientos(7).subscribe({
      next: (data) => this.vencimientos.set(data),
      error: () => this.notificationService.error('No se pudieron cargar los vencimientos.'),
    });
  }

  statusColor(status: string): string {
    const key = status.toLowerCase();
    if (key.includes('activo')) return '#00E676';
    if (key.includes('vencido')) return '#FF4444';
    if (key.includes('suspendido')) return '#FFA500';
    return '#00D4FF';
  }

  statusIcon(status: string): string {
    const key = status.toLowerCase();
    if (key.includes('activo')) return 'bi-check-circle-fill';
    if (key.includes('vencido')) return 'bi-x-circle-fill';
    return 'bi-pause-circle-fill';
  }
}