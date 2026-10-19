import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import { ApiResponse, ProductResponse } from "@/types";

export const favoriteHandlers = [
  // POST /api/v1/favorites/{productId}
  http.post<any, any, ApiResponse<null>>(`${baseUrl}/favorites/:productId`, () => {
    return HttpResponse.json({ success: true, data: null });
  }),

  // DELETE /api/v1/favorites/{productId}
  http.delete<any, any, ApiResponse<null>>(`${baseUrl}/favorites/:productId`, () => {
    return HttpResponse.json({ success: true, data: null });
  }),

  // GET /api/v1/favorites
  http.get<any, any, ApiResponse<ProductResponse[]>>(`${baseUrl}/favorites`, () => {
    return HttpResponse.json({
      success: true,
      data: [],
      meta: {
        currentPage: 0,
        lastPage: 1,
        perPage: 20,
        total: 0
      }
    });
  }),
];
