import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import { 
  ApiResponse,
  CompanyResponse, 
  CreateCompanyRequest, 
  FinanceSummaryResponse, 
  CompanyPayoutResponse,
  CompanyStatus,
  PayoutStatus
} from "@/types";

export const companyHandlers = [
  // POST /api/v1/company/register
  http.post<any, CreateCompanyRequest, ApiResponse<CompanyResponse>>(`${baseUrl}/company/register`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: 1,
        userId: 123,
        shopName: body.companyName,
        description: body.description || "A modern electronics store",
        logoUrl: "https://via.placeholder.com/150",
        workingHours: body.workingHours || "Mon-Fri 9:00-18:00",
        productType: body.productType || "Electronics",
        addresses: [
          {
            id: 10,
            country: "Uzbekistan",
            region: "Tashkent",
            district: "Yunusabad",
            street: body.street,
            zipCode: body.zipCode || "100000",
            latitude: body.latitude,
            longitude: body.longitude,
            isActive: true
          }
        ],
        status: CompanyStatus.PENDING,
        commissionRate: 0.05,
        createdAt: new Date().toISOString()
      }
    });
  }),

  // GET /api/v1/company/all
  http.get(`${baseUrl}/company/all`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 1,
          userId: 123,
          shopName: "Tech Store",
          description: "A modern electronics store",
          logoUrl: "https://via.placeholder.com/150",
          workingHours: "Mon-Fri 9:00-18:00",
          productType: "Electronics",
          addresses: [],
          status: CompanyStatus.ACTIVE,
          commissionRate: 0.05,
          createdAt: "2026-01-01T10:00:00"
        }
      ],
      meta: {
        currentPage: 0,
        lastPage: 1,
        perPage: 20,
        total: 1
      }
    });
  }),

  // GET /api/v1/company/{companyId}/profile
  http.get(`${baseUrl}/company/:companyId/profile`, ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        id: Number(params.companyId),
        userId: 123,
        shopName: "Tech Store",
        description: "A modern electronics store",
        logoUrl: "https://via.placeholder.com/150",
        workingHours: "Mon-Fri 9:00-18:00",
        productType: "Electronics",
        addresses: [],
        status: CompanyStatus.ACTIVE,
        commissionRate: 0.05,
        createdAt: "2026-01-01T10:00:00"
      }
    });
  }),

  // PUT /api/v1/company/{companyId}/profile
  http.put<any, CreateCompanyRequest, ApiResponse<CompanyResponse>>(`${baseUrl}/company/:companyId/profile`, async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        id: Number(params.companyId),
        userId: 123,
        shopName: body.companyName,
        description: body.description || "",
        logoUrl: "https://via.placeholder.com/150",
        workingHours: body.workingHours || "",
        productType: body.productType || "",
        addresses: [],
        status: CompanyStatus.ACTIVE,
        commissionRate: 0.05,
        createdAt: "2026-01-01T10:00:00"
      }
    });
  }),

  // GET /api/v1/company/{companyId}/finance/summary
  http.get(`${baseUrl}/company/:companyId/finance/summary`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        totalGross: 10000.00,
        totalFee: 500.00,
        totalNet: 9500.00,
        pendingNet: 1500.00
      }
    });
  }),

  // GET /api/v1/company/{companyId}/finance/payouts
  http.get(`${baseUrl}/company/:companyId/finance/payouts`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 456,
          orderId: 789,
          gross: 100.00,
          fee: 5.00,
          net: 95.00,
          status: PayoutStatus.PAID,
          paidAt: "2026-02-01T12:00:00",
          createdAt: "2026-01-31T12:00:00"
        }
      ],
      meta: {
        currentPage: 0,
        lastPage: 1,
        perPage: 20,
        total: 1
      }
    });
  }),
];
