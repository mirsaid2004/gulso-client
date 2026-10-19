import { CONFIG } from "@/config";
import { ApiResponse as CentralizedApiResponse } from "@/types/api";

export const baseUrl = CONFIG.API_BASE_URL;

export type ApiResponse<T> = CentralizedApiResponse<T>;
