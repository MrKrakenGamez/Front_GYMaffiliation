import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffiliateService } from '../../../features/affiliates/services/affiliate';
import { AfiliadoLista } from '../../../features/affiliates/models/affiliate.model';
import { SearchInputComponent } from '../search-input/search-input';

@Component({
  selector: 'app-affiliate-picker',
  standalone: true,
  imports: [CommonModule, SearchInputComponent],
  template: `
    <div class="affiliate-picker">
      @if (selected(); as afiliado) {
        <div class="d-flex justify-content-between align-items-center glassmorphism p-3">
          <div>
            <div class="fw-semibold">{{ afiliado.fullName }}</div>
            <small class="text-white-50">{{ afiliado.documentNumber }} · {{ afiliado.email }}</small>
          </div>
          <button class="btn btn-sm btn-outline-light" (click)="clear()">Cambiar</button>
        </div>
      } @else {
        <app-search-input placeholder="Buscar afiliado por nombre o documento..." (search)="onSearch($event)" />
        @if (results().length > 0) {
          <div class="results-list glassmorphism mt-2 p-2">
            @for (item of results(); track item.affiliateId) {
              <button type="button" class="result-item" (click)="select(item)">
                {{ item.fullName }} — {{ item.documentNumber }}
              </button>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .results-list { max-height: 220px; overflow-y: auto; }
    .result-item {
      display: block;
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      color: #fff;
      padding: 8px 10px;
      border-radius: 8px;
      &:hover { background: rgba(0, 212, 255, 0.1); }
    }
  `],
})
export class AffiliatePickerComponent {
  private affiliateService = inject(AffiliateService);

  affiliateSelected = output<AfiliadoLista>();
  selected = signal<AfiliadoLista | null>(null);
  results = signal<AfiliadoLista[]>([]);

  onSearch(term: string): void {
    if (!term) {
      this.results.set([]);
      return;
    }
    this.affiliateService
      .listar({ pageNumber: 1, pageSize: 8, filterSearch: term })
      .subscribe((res) => this.results.set(res.data?.items ?? []));
  }

  select(item: AfiliadoLista): void {
    this.selected.set(item);
    this.results.set([]);
    this.affiliateSelected.emit(item);
  }

  clear(): void {
    this.selected.set(null);
    this.affiliateSelected.emit(undefined as unknown as AfiliadoLista);
  }
}