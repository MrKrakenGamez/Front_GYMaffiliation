import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-wrapper">
      <i class="bi bi-search"></i>
      <input
        type="text"
        class="form-control"
        [placeholder]="placeholder()"
        [(ngModel)]="term"
        (ngModelChange)="onChange($event)"
      />
    </div>
  `,
  styles: [`
    .search-wrapper {
      position: relative;
      i {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: #888;
      }
      input {
        padding-left: 36px;
      }
    }
  `],
})
export class SearchInputComponent {
  placeholder = input('Buscar...');
  search = output<string>();
  term = '';
  private debounceTimer?: ReturnType<typeof setTimeout>;

  onChange(value: string): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.search.emit(value), 400);
  }
}