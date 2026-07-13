import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AffiliateService } from '../services/affiliate';
import { NotificationService } from '../../../core/services/notification';
import { Afiliado } from '../models/affiliate.model';

@Component({
  selector: 'app-affiliate-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './affiliate-detail.html',
  styleUrl: './affiliate-detail.scss',
})
export class AffiliateDetailComponent {
  private affiliateService = inject(AffiliateService);
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  afiliado = signal<Afiliado | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.affiliateService.obtenerPorId(id).subscribe((data) => {
      if (!data) {
        this.notificationService.error('Afiliado no encontrado.');
        this.router.navigate(['/affiliates']);
        return;
      }
      this.afiliado.set(data);
    });
  }

  statusClass(statusName: string): string {
    const key = statusName.toLowerCase();
    if (key.includes('activo')) return 'badge-activo';
    if (key.includes('vencido')) return 'badge-vencido';
    if (key.includes('suspendido')) return 'badge-suspendido';
    return 'badge-activo';
  }
}