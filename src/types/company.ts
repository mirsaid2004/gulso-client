import { CompanyStatus, PayoutStatus } from "./enums";

export interface CreateCompanyRequest {
  companyName: string;
  description?: string;
  logoId?: number;
  workingHours?: string;
  productType?: string;
  countryId: number;
  regionId: number;
  districtId: number;
  street: string;
  zipCode?: string;
  latitude: number;
  longitude: number;
}

export interface AddressResponse {
  id: number;
  country: string;
  region: string;
  district: string;
  street: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export interface CompanyResponse {
  id: number;
  userId: number;
  shopName: string;
  description: string;
  logoUrl: string;
  workingHours: string;
  productType: string;
  addresses: AddressResponse[];
  status: CompanyStatus;
  commissionRate: number;
  createdAt: string;
}

export interface FinanceSummaryResponse {
  totalGross: number;
  totalFee: number;
  totalNet: number;
  pendingNet: number;
}

export interface CompanyPayoutResponse {
  id: number;
  orderId: number;
  gross: number;
  fee: number;
  net: number;
  status: PayoutStatus;
  paidAt?: string;
  createdAt: string;
}
