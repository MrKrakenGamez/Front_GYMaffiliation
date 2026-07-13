export interface IngresoMensual {
  year: number;
  month: number;
  paymentMethod: string;
  totalPayments: number;
  totalRevenue: number;
  avgPayment: number;
  branchName: string | null;
}

export interface AfiliadoEstado {
  status: string;
  total: number;
  branchName: string | null;
}

export interface Vencimiento {
  membershipId: number;
  affiliateId: number;
  fullName: string;
  phone: string | null;
  email: string | null;
  membershipType: string;
  endDate: string;
  daysUntilExpiry: number;
  branchName: string | null;
  notificationSent: boolean;
}