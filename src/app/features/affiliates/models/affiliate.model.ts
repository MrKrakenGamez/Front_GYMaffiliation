export interface MembresiaResumen {
  membershipId: number;
  typeCode: string | null;
  typeName: string | null;
  accessScope: string | null;
  startDate: string | null;
  endDate: string | null;
  daysUntilExpiry: number | null;
  branchName: string | null;
  renewalCount: number | null;
}

export interface PagoResumen {
  lastPaymentId: number | null;
  amount: number | null;
  paymentDate: string | null;
  methodName: string | null;
}

/** Detalle completo — GET /afiliados/{id} */
export interface Afiliado {
  affiliateId: number;
  documentNumber: string;
  documentType: string;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  phone: string | null;
  email: string;
  address: string | null;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  baseBranchId: number | null;
  baseBranchName: string | null;
  statusName: string;
  registrationDate: string;
  notes: string | null;
  membresiaVigente: MembresiaResumen | null;
  ultimoPago: PagoResumen | null;
}

/** Fila de listado — GET /afiliados */
export interface AfiliadoLista {
  affiliateId: number;
  documentNumber: string;
  fullName: string;
  age: number;
  phone: string | null;
  email: string;
  baseBranchName: string | null;
  statusName: string;
  currentMembership: string | null;
  membershipEndDate: string | null;
  daysUntilExpiry: number | null;
  registrationDate: string;
}

export interface CrearAfiliadoRequest {
  documentNumber: string;
  documentType: string;
  firstName: string;
  lastName: string;
  birthDate: string; // 'YYYY-MM-DD'
  email: string;
  phone?: string | null;
  address?: string | null;
  emergencyContact?: string | null;
  emergencyPhone?: string | null;
  baseBranchId?: number | null;
  notes?: string | null;
}

export interface ActualizarAfiliadoRequest {
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  emergencyContact?: string | null;
  emergencyPhone?: string | null;
  baseBranchId?: number | null;
  notes?: string | null;
}

export interface CrearAfiliadoResponse {
  affiliateId: number;
  message: string;
}

export interface ListarAfiliadosParams {
  filterStatus?: number | null;
  filterBranchId?: number | null;
  filterSearch?: string | null;
  pageNumber: number;
  pageSize: number;
}