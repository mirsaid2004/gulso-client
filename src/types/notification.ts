export type NotificationType = "ORDER_STATUS" | "PRODUCT_REVIEW";

export interface NotificationItemResponse {
  id: number;
  productName: string;
  productImageUrl?: string;
}

export interface NotificationResponse {
  id: number;
  type: NotificationType;
  orderId: number;
  orderItems: NotificationItemResponse[];
  status?: string;      // present for ORDER_STATUS
  productId?: number;   // present for PRODUCT_REVIEW
  isRead: boolean;
  createdAt: string;
}
