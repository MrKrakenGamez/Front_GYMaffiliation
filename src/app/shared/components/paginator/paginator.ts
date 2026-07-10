import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  template: `
    <nav class="d-flex justify-content-between align-items-center mt-3">
      <span class="text-white-50 small">
        Página {{ page() }} de {{ totalPages() || 1 }} — {{ totalCount() }} resultados
      </span>
      <div class="btn-group">
        <button
          class="btn btn-sm btn-outline-light"
          [disabled]="page() <= 1"
          (click)="pageChange.emit(page() - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button
          class="btn btn-sm btn-outline-light"
          [disabled]="page() >= totalPages()"
          (click)="pageChange.emit(page() + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </nav>
  `,
})
export class PaginatorComponent {
  page = input(1);
  totalPages = input(1);
  totalCount = input(0);
  pageChange = output<number>();
}