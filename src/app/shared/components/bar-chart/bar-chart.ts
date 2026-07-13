import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BarChartItem {
  label: string;
  value: number;
  colorHex?: string;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bar-chart">
      @for (item of items(); track item.label) {
        <div class="bar-row">
          <span class="bar-label">{{ item.label }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              [style.width.%]="maxValue() > 0 ? (item.value / maxValue()) * 100 : 0"
              [style.background]="item.colorHex || '#00D4FF'"
            ></div>
          </div>
          <span class="bar-value">{{ item.value | number: '1.0-2' }}</span>
        </div>
      } @empty {
        <p class="text-white-50 text-center mb-0">Sin datos para este período.</p>
      }
    </div>
  `,
  styles: [`
    .bar-row {
      display: grid;
      grid-template-columns: 110px 1fr 90px;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .bar-label { color: #f5f5f5; font-size: 0.85rem; }
    .bar-track {
      background: #2c2c2c;
      border-radius: 8px;
      height: 14px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 8px;
      transition: width 0.4s ease-in-out;
    }
    .bar-value { color: #888; font-size: 0.8rem; text-align: right; }
  `],
})
export class BarChartComponent {
  items = input<BarChartItem[]>([]);
  maxValue = input(0);
}