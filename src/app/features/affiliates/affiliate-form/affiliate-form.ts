// src/app/features/affiliates/affiliate-form/affiliate-form.component.ts

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AffiliateService } from '../services/affiliate';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-affiliate-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './affiliate-form.html',
  styleUrl: './affiliate-form.scss',
})
export class AffiliateFormComponent {
  private fb = inject(FormBuilder);
  private affiliateService = inject(AffiliateService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  affiliateId = signal<number | null>(null);
  isEditMode = signal(false);
  isSubmitting = signal(false);

  documentTypes = ['DNI', 'PASAPORTE', 'CEDULA'];

  form = this.fb.group({
    documentNumber: ['', Validators.required],
    documentType: ['DNI', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: [''], // se vuelve requerido solo en modo creación (ver constructor)
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address: [''],
    emergencyContact: [''],
    emergencyPhone: [''],
    notes: [''],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode.set(true);
      this.affiliateId.set(Number(idParam));
      this.loadAffiliate(Number(idParam));
      this.form.controls.documentNumber.disable();
      this.form.controls.documentType.disable();
      // TODO: si el backend agrega BirthDate a AfiliadoResponse, quitar esta línea
      // y volver a poner Validators.required en birthDate.
    } else {
      this.form.controls.birthDate.addValidators(Validators.required);
      this.form.controls.birthDate.updateValueAndValidity();
    }
  }

  private loadAffiliate(id: number): void {
    this.affiliateService.obtenerPorId(id).subscribe((afiliado) => {
      if (!afiliado) {
        this.notificationService.error('Afiliado no encontrado.');
        this.router.navigate(['/affiliates']);
        return;
      }
      this.form.patchValue({
        documentNumber: afiliado.documentNumber,
        documentType: afiliado.documentType,
        firstName: afiliado.firstName,
        lastName: afiliado.lastName,
        email: afiliado.email,
        phone: afiliado.phone ?? '',
        address: afiliado.address ?? '',
        emergencyContact: afiliado.emergencyContact ?? '',
        emergencyPhone: afiliado.emergencyPhone ?? '',
        notes: afiliado.notes ?? '',
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const raw = this.form.getRawValue();

    if (this.isEditMode()) {
      this.affiliateService
        .actualizar(this.affiliateId()!, {
          firstName: raw.firstName,
          lastName: raw.lastName,
          birthDate: raw.birthDate || null,
          email: raw.email,
          phone: raw.phone || null,
          address: raw.address || null,
          emergencyContact: raw.emergencyContact || null,
          emergencyPhone: raw.emergencyPhone || null,
          notes: raw.notes || null,
        })
        .subscribe({
          next: (res) => {
            this.isSubmitting.set(false);
            if (res.success) {
              this.notificationService.success(
                'Afiliado actualizado correctamente.',
              );
              this.router.navigate(['/affiliates', this.affiliateId()]);
            } else {
              this.notificationService.error(
                res.error?.message ?? 'No se pudo actualizar.',
              );
            }
          },
          error: () => {
            this.isSubmitting.set(false);
            this.notificationService.error(
              'No se pudo actualizar el afiliado.',
            );
          },
        });
    } else {
      this.affiliateService
        .crear({
          documentNumber: raw.documentNumber!,
          documentType: raw.documentType!,
          firstName: raw.firstName!,
          lastName: raw.lastName!,
          birthDate: raw.birthDate!,
          email: raw.email!,
          phone: raw.phone || null,
          address: raw.address || null,
          emergencyContact: raw.emergencyContact || null,
          emergencyPhone: raw.emergencyPhone || null,
          notes: raw.notes || null,
        })
        .subscribe({
          next: (res) => {
            this.isSubmitting.set(false);
            if (res.success && res.data) {
              this.notificationService.success(
                'Afiliado creado correctamente.',
              );
              this.router.navigate(['/affiliates', res.data.affiliateId]);
            } else {
              this.notificationService.error(
                res.error?.message ?? 'No se pudo crear el afiliado.',
              );
            }
          },
          error: () => {
            this.isSubmitting.set(false);
            this.notificationService.error('No se pudo crear el afiliado.');
          },
        });
    }
  }
}
