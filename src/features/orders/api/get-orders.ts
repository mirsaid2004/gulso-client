import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ApiResponse, OrderFilter, OrderResponse } from "@/types";

export const getOrders = (
  params?: OrderFilter
): Promise<ApiResponse<OrderResponse[]>> =>
  api.get("/orders", { params: params as Record<string, any> });

export const getOrdersQueryOptions = (params?: OrderFilter) =>
  queryOptions({
    queryKey: ["orders", params ?? {}],
    queryFn: () => getOrders(params),
  });

export const useOrders = (params?: OrderFilter) =>
  useQuery(getOrdersQueryOptions(params));
