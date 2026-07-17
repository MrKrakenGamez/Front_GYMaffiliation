import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MembershipService } from '../services/membership';
import { NotificationService } from '../../../core/services/notification';
import { AffiliatePickerComponent } from '../../../shared/components/affiliate-picker/affiliate-picker';
import { PlanCardComponent } from '../../../shared/components/plan-card/plan-card';
import { AfiliadoLista } from '../../affiliates/models/affiliate.model';
import { MembershipType } from '../models/membership.model';

type ActionTab = 'assign' | 'renew' | 'change-plan';

@Component({
  selector: 'app-membership-manage',
  standalone: true,
  imports: [CommonModule, FormsModule, AffiliatePickerComponent, PlanCardComponent],
  templateUrl: './membership-manage.html',
  styleUrl: './membership-manage.scss',
})
export class MembershipManageComponent {
  private membershipService = inject(MembershipService);
  private notificationService = inject(NotificationService);

  activeTab = signal<ActionTab>('assign');
  plans = signal<MembershipType[]>([]);
  selectedAffiliate = signal<AfiliadoLista | null>(null);
  selectedPlan = signal<MembershipType | null>(null);
  startDate = signal<string>('');
  notes = signal<string>('');
  isSubmitting = signal(false);

  constructor() {
    this.membershipService.getTipos().subscribe({
      next: (data) => this.plans.set(data),
      error: () => this.notificationService.error('No se pudo cargar el catálogo de planes.'),
    });
  }

  maxPrice(): number {
    return Math.max(0, ...this.plans().map((p) => p.price));
  }

  isPremium(plan: MembershipType): boolean {
    return plan.price === this.maxPrice() && this.maxPrice() > 0;
  }

  setTab(tab: ActionTab): void {
    this.activeTab.set(tab);
    this.selectedPlan.set(null);
  }

  onAffiliateSelected(affiliate: AfiliadoLista | undefined): void {
    this.selectedAffiliate.set(affiliate ?? null);
  }

  submit(): void {
    const affiliate = this.selectedAffiliate();
    if (!affiliate) {
      this.notificationService.error('Selecciona un afiliado primero.');
      return;
    }

    const tab = this.activeTab();

    if (tab !== 'renew' && !this.selectedPlan()) {
      this.notificationService.error('Selecciona un plan.');
      return;
    }

    this.isSubmitting.set(true);

    if (tab === 'assign') {
      this.membershipService
        .asignar({
          affiliateId: affiliate.affiliateId,
          membershipTypeId: this.selectedPlan()!.membershipTypeId,
          startDate: this.startDate() || null,
          notes: this.notes() || null,
        })
        .subscribe(this.handleResponse('Membresía asignada correctamente.'));
    } else if (tab === 'renew') {
      this.membershipService
        .renovar({
          affiliateId: affiliate.affiliateId,
          membershipTypeId: this.selectedPlan()?.membershipTypeId ?? null,
          notes: this.notes() || null,
        })
        .subscribe(this.handleResponse('Membresía renovada correctamente.'));
    } else {
      this.membershipService
        .cambiarPlan({
          affiliateId: affiliate.affiliateId,
          newMembershipTypeId: this.selectedPlan()!.membershipTypeId,
          startDate: this.startDate() || null,
        })
        .subscribe(this.handleResponse('Plan cambiado correctamente.'));
    }
  }

  private handleResponse(successMessage: string) {
    return {
      next: (res: { success: boolean; error: { message?: string; details?: Record<string, string[]> } | null }) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.notificationService.success(successMessage);
          this.resetForm();
        } else {
          this.notificationService.error(this.extractErrorMessage(res.error));
        }
      },
      error: (err: { error?: { error?: { message?: string; details?: Record<string, string[]> } } }) => {
        this.isSubmitting.set(false);
        this.notificationService.error(this.extractErrorMessage(err.error?.error));
      },
    };
  }

  private extractErrorMessage(
    error: { message?: string; details?: Record<string, string[]> } | null | undefined
  ): string {
    if (!error) return 'Ocurrió un error inesperado.';
    if (error.details) {
      const first = Object.values(error.details)[0];
      if (first?.length) return first[0];
    }
    return error.message ?? 'Ocurrió un error inesperado.';
  }

  private resetForm(): void {
    this.selectedAffiliate.set(null);
    this.selectedPlan.set(null);
    this.startDate.set('');
    this.notes.set('');
  }
}