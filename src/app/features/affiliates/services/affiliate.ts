import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, PagedApiResponse } from '../../../core/models/api-response.model';
import {
  ActualizarAfiliadoRequest,
  Afiliado,
  AfiliadoLista,
  CrearAfiliadoRequest,
  CrearAfiliadoResponse,
  ListarAfiliadosParams,
} from '../models/affiliate.model';

const BASE_URL = `${environment.apiUrl}/afiliados`;

@Injectable({ providedIn: 'root' })
export class AffiliateService {
  private http = inject(HttpClient);

  listar(params: ListarAfiliadosParams): Observable<PagedApiResponse<AfiliadoLista>> {
    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize);

    if (params.filterSearch) httpParams = httpParams.set('filterSearch', params.filterSearch);
    if (params.filterStatus != null) httpParams = httpParams.set('filterStatus', params.filterStatus);
    if (params.filterBranchId != null) httpParams = httpParams.set('filterBranchId', params.filterBranchId);

    return this.http.get<PagedApiResponse<AfiliadoLista>>(BASE_URL, { params: httpParams });
  }

  obtenerPorId(id: number): Observable<Afiliado | null> {
    return this.http
      .get<ApiResponse<Afiliado>>(`${BASE_URL}/${id}`)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  crear(request: CrearAfiliadoRequest): Observable<ApiResponse<CrearAfiliadoResponse>> {
    return this.http.post<ApiResponse<CrearAfiliadoResponse>>(BASE_URL, request);
  }

  actualizar(id: number, request: ActualizarAfiliadoRequest): Observable<ApiResponse<unknown>> {
    return this.http.put<ApiResponse<unknown>>(`${BASE_URL}/${id}`, request);
  }

  eliminar(id: number, notes?: string): Observable<ApiResponse<unknown>> {
    let params = new HttpParams();
    if (notes) params = params.set('notes', notes);
    return this.http.delete<ApiResponse<unknown>>(`${BASE_URL}/${id}`, { params });
  }
}