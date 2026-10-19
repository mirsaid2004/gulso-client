import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { ApiResponse, OrderResponse } from "@/types";

export interface PayOrderRequest {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export const payOrder = (
  orderId: number,
  data: PayOrderRequest
): Promise<ApiResponse<OrderResponse>> =>
  api.post(`/orders/${orderId}/payment`, data);

export const usePayOrder = () =>
  useMutation({ mutationFn: ({ orderId, ...data }: PayOrderRequest & { orderId: number }) => payOrder(orderId, data) });
