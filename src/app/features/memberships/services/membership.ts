import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import {
  AsignarMembresiaRequest,
  CambiarPlanRequest,
  MembershipType,
  MembresiaResponse,
  RenovarMembresiaRequest,
} from '../models/membership.model';

const BASE_URL = `${environment.apiUrl}/membresias`;

@Injectable({ providedIn: 'root' })
export class MembershipService {
  private http = inject(HttpClient);

  getTipos(): Observable<MembershipType[]> {
    return this.http
      .get<ApiResponse<MembershipType[]>>(`${BASE_URL}/tipos`)
      .pipe(map((res) => res.data ?? []));
  }

  asignar(request: AsignarMembresiaRequest): Observable<ApiResponse<MembresiaResponse>> {
    return this.http.post<ApiResponse<MembresiaResponse>>(`${BASE_URL}/asignar`, request);
  }

  renovar(request: RenovarMembresiaRequest): Observable<ApiResponse<MembresiaResponse>> {
    return this.http.post<ApiResponse<MembresiaResponse>>(`${BASE_URL}/renovar`, request);
  }

  cambiarPlan(request: CambiarPlanRequest): Observable<ApiResponse<MembresiaResponse>> {
    return this.http.put<ApiResponse<MembresiaResponse>>(`${BASE_URL}/cambiar-plan`, request);
  }
}