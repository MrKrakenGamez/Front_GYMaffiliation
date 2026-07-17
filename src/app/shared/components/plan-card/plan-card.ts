import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipType } from '../../../features/memberships/models/membership.model';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="plan-card"
      [class.premium]="isPremium()"
      [class.selected]="selected()"
      (click)="planSelected.emit(plan())"
    >
      <h5 [class.text-gold]="isPremium()" [class.text-electric-blue]="!isPremium()">
        {{ plan().name }}
      </h5>
      <p class="price mb-1">{{ plan().price | currency }}</p>
      <small class="text-white-50 d-block mb-2">{{ plan().durationDays }} días</small>
      @if (plan().accessScope) {
        <small class="text-white-50">{{ plan().accessScope }}</small>
      }
    </button>
  `,
  styles: [`
    .plan-card {
      display: block;
      width: 100%;
      background: #1a1a1a;
      border: 2px solid #2c2c2c;
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      transition: all 0.2s ease-in-out;
      color: #fff;

      &:hover { transform: translateY(-2px); border-color: #00d4ff; }
      &.premium { border-color: rgba(255, 215, 0, 0.4); }
      &.premium:hover { border-color: #ffd700; }
      &.selected { border-color: #00d4ff; box-shadow: 0 0 16px rgba(0, 212, 255, 0.3); }
      &.premium.selected { border-color: #ffd700; box-shadow: 0 0 16px rgba(255, 215, 0, 0.3); }
    }
    .price { font-size: 1.4rem; font-weight: 600; }
  `],
})
export class PlanCardComponent {
  plan = input.required<MembershipType>();
  selected = input(false);
  isPremium = input(false);
  planSelected = output<MembershipType>();
}