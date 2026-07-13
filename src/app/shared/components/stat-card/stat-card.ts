import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card neomorphic p-4">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="text-white-50">{{ label() }}</span>
        <i class="bi {{ icon() }}" [style.color]="accentColor()"></i>
      </div>
      <h3 class="mb-0" [style.color]="accentColor()">{{ value() }}</h3>
    </div>
  `,
  styles: [`
    .stat-card {
      transition: transform 0.2s ease-in-out;
      &:hover { transform: translateY(-2px); }
    }
  `],
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string>();
  icon = input('bi-graph-up');
  accentColor = input('#00D4FF');
}