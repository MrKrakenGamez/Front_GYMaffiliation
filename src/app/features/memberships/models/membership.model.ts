export interface MembershipType {
  membershipTypeId: number;
  code: string;
  name: string;
  durationDays: number;
  price: number;
  accessScope: string | null;
}

export interface AsignarMembresiaRequest {
  affiliateId: number;
  membershipTypeId: number;
  branchId?: number | null;
  startDate?: string | null; // 'YYYY-MM-DD'
  notes?: string | null;
}

export interface RenovarMembresiaRequest {
  affiliateId: number;
  membershipTypeId?: number | null;
  branchId?: number | null;
  notes?: string | null;
}

export interface CambiarPlanRequest {
  affiliateId: number;
  newMembershipTypeId: number;
  branchId?: number | null;
  startDate?: string | null;
}

export interface MembresiaResponse {
  membershipId: number;
  message: string;
  typeName: string | null;
  startDate: string | null;
  endDate: string | null;
  daysUntilExpiry: number | null;
}