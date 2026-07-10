import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AffiliateService } from '../services/affiliate';
import { NotificationService } from '../../../core/services/notification';
import { ConfirmationService } from '../../../shared/services/confirmation';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator';
import { AfiliadoLista } from '../models/affiliate.model';

@Component({
  selector: 'app-affiliate-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchInputComponent, PaginatorComponent],
  templateUrl: './affiliate-list.html',
  styleUrl: './affiliate-list.scss',
})
export class AffiliateListComponent {
  private affiliateService = inject(AffiliateService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);

  items = signal<AfiliadoLista[]>([]);
  page = signal(1);
  pageSize = 10;
  totalPages = signal(1);
  totalCount = signal(0);
  searchTerm = signal('');

  constructor() {
    this.load();
  }

  load(): void {
    this.affiliateService
      .listar({
        pageNumber: this.page(),
        pageSize: this.pageSize,
        filterSearch: this.searchTerm() || null,
      })
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.items.set(res.data.items);
            this.totalPages.set(res.data.totalPages);
            this.totalCount.set(res.data.totalCount);
          }
        },
        error: () => this.notificationService.error('No se pudo cargar el listado de afiliados.'),
      });
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
    this.page.set(1);
    this.load();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.load();
  }

  async onDelete(item: AfiliadoLista): Promise<void> {
    const confirmed = await this.confirmationService.confirm(
      `¿Eliminar a ${item.fullName}? Esta acción da de baja al afiliado.`,
      'Eliminar afiliado'
    );
    if (!confirmed) return;

    this.affiliateService.eliminar(item.affiliateId).subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.success('Afiliado eliminado correctamente.');
          this.load();
        } else {
          this.notificationService.error(res.error?.message ?? 'No se pudo eliminar.');
        }
      },
      error: () => this.notificationService.error('No se pudo eliminar el afiliado.'),
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