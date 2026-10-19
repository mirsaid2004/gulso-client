import { OrderStatus, DeliveryType, PaymentType } from "./enums";

export interface CreateOrderRequest {
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  latitude: number;
  longitude: number;
  deliveryDate: string;
  deliveryType: DeliveryType;
  comment?: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  productImageUrl?: string;
  productPrice: number;
  productDiscount: number;
  quantity: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryDate: string;
  comment: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItemResponse[];
  createdAt: string;
}

export interface OrderFilter {
  status?: OrderStatus;
  from?: string;
  to?: string;
  search?: string;
  isActive?: boolean;
}
