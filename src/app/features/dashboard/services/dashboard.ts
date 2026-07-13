import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { AfiliadoEstado, IngresoMensual, Vencimiento } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);

  getIngresos(year: number, month: number, branchId?: number): Observable<IngresoMensual[]> {
    let params = new HttpParams().set('year', year).set('month', month);
    if (branchId != null) params = params.set('branchId', branchId);

    return this.http
      .get<ApiResponse<IngresoMensual[]>>(`${environment.apiUrl}/reportes/ingresos`, { params })
      .pipe(map((res) => res.data ?? []));
  }

  getAfiliadosActivos(branchId?: number): Observable<AfiliadoEstado[]> {
    let params = new HttpParams();
    if (branchId != null) params = params.set('branchId', branchId);

    return this.http
      .get<ApiResponse<AfiliadoEstado[]>>(`${environment.apiUrl}/reportes/afiliados-activos`, { params })
      .pipe(map((res) => res.data ?? []));
  }

  getVencimientos(daysAhead = 7): Observable<Vencimiento[]> {
    const params = new HttpParams().set('daysAhead', daysAhead);
    return this.http
      .get<ApiResponse<Vencimiento[]>>(`${environment.apiUrl}/notificaciones/por-vencer`, { params })
      .pipe(map((res) => res.data ?? []));
  }
}