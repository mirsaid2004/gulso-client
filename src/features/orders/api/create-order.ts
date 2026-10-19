import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ApiResponse, CreateOrderRequest, OrderResponse } from "@/types";

export const createOrder = (
  data: CreateOrderRequest
): Promise<ApiResponse<OrderResponse>> => api.post("/orders", data);

export const useCreateOrder = () =>
  useMutation({ mutationFn: createOrder });
