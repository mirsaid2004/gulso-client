import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import { db, nextId } from "../db";
import { createAndBroadcast } from "./notifications";
import {
  ApiResponse,
  OrderResponse,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrderStatus,
} from "@/types";

function findOrder(id: unknown) {
  return db.orders.find((o) => o.id === Number(id));
}

function orderNotFound() {
  return HttpResponse.json(
    { success: false, data: null, error: { code: "NOT_FOUND", message: "Order not found" } },
    { status: 404 }
  );
}

function updateStatus(orderId: unknown, status: OrderStatus) {
  const order = findOrder(orderId);
  if (!order) return orderNotFound();

  order.status = status;
  createAndBroadcast({
    type: "ORDER_STATUS",
    orderId: order.id,
    orderItems: order.items.map((i: any) => ({
      id: i.id,
      productName: i.productName,
      productImageUrl: i.productImageUrl,
    })),
    status,
  });
  if (status === OrderStatus.COMPLETED) {
    for (const item of order.items as any[]) {
      createAndBroadcast({
        type: "PRODUCT_REVIEW",
        orderId: order.id,
        orderItems: [{ id: item.id, productName: item.productName, productImageUrl: item.productImageUrl }],
        productId: item.productId,
      });
    }
  }
  return HttpResponse.json({ success: true, data: order });
}

export const orderHandlers = [
  // POST /api/v1/orders
  http.post<any, CreateOrderRequest, ApiResponse<OrderResponse>>(
    `${baseUrl}/orders`,
    async ({ request }) => {
      const body = await request.json();

      const productMap = new Map(db.products.map((p) => [p.id, p]));

      let itemIdCounter = 1;
      const orderItems = body.items.map((reqItem) => {
        const product = productMap.get(reqItem.productId);
        const price = product?.price ?? 0;
        const discount = product?.discount ?? 0;
        const actualPrice = Math.round(price * (1 - discount));
        return {
          id: itemIdCounter++,
          productId: reqItem.productId,
          productName: product?.name?.en ?? `Product ${reqItem.productId}`,
          productImageUrl: product?.imageUrl ?? "",
          productPrice: price,
          productDiscount: discount,
          quantity: reqItem.quantity,
          subtotal: actualPrice * reqItem.quantity,
        };
      });

      const totalAmount = orderItems.reduce((s, i) => s + i.subtotal, 0);
      const newOrder = {
        id: nextId(db.orders),
        recipientName: body.recipientName,
        recipientPhone: body.recipientPhone,
        deliveryAddress: body.deliveryAddress ?? "",
        latitude: body.latitude ?? 0,
        longitude: body.longitude ?? 0,
        deliveryDate: body.deliveryDate,
        deliveryType: body.deliveryType,
        comment: body.comment ?? "",
        status: OrderStatus.ACCEPTED,
        totalAmount,
        items: orderItems,
        createdAt: new Date().toISOString(),
      };

      db.orders.push(newOrder);

      return HttpResponse.json({ success: true, data: newOrder });
    }
  ),

  // GET /api/v1/orders
  http.get(`${baseUrl}/orders`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") ?? undefined;
    const from = url.searchParams.get("from") ?? undefined;
    const to = url.searchParams.get("to") ?? undefined;
    const search = url.searchParams.get("search")?.toLowerCase() ?? undefined;
    const isActive = url.searchParams.get("isActive") ?? undefined;
    const page = Number(url.searchParams.get("page") ?? 0);
    const size = Number(url.searchParams.get("size") ?? 20);

    const ACTIVE_STATUSES: OrderStatus[] = [
      OrderStatus.ACCEPTED,
      OrderStatus.PREPARING,
      OrderStatus.IN_DELIVERY,
    ];

    let orders = [...db.orders];

    if (status) orders = orders.filter((o) => o.status === status);
    if (isActive === "true")
      orders = orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
    if (isActive === "false")
      orders = orders.filter((o) => !ACTIVE_STATUSES.includes(o.status));
    if (from) orders = orders.filter((o) => o.createdAt >= from);
    if (to) orders = orders.filter((o) => o.createdAt <= to);
    if (search)
      orders = orders.filter(
        (o) =>
          o.recipientName.toLowerCase().includes(search) ||
          o.recipientPhone.includes(search) ||
          String(o.id).includes(search)
      );

    orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const total = orders.length;
    const lastPage = Math.max(1, Math.ceil(total / size));
    const data = orders.slice(page * size, page * size + size);

    return HttpResponse.json({
      success: true,
      data,
      meta: { currentPage: page, lastPage, perPage: size, total },
    });
  }),

  // GET /api/v1/orders/:orderId
  http.get(`${baseUrl}/orders/:orderId`, ({ params }) => {
    const order = findOrder(params.orderId);
    if (!order) return orderNotFound();
    return HttpResponse.json({ success: true, data: order });
  }),

  // PATCH /api/v1/orders/:orderId/status
  http.patch<any, UpdateOrderStatusRequest>(
    `${baseUrl}/orders/:orderId/status`,
    async ({ params, request }) => {
      const { status } = await request.json();
      return updateStatus(params.orderId, status);
    }
  ),

  // PATCH /api/v1/company/:companyId/orders/:orderId/status
  http.patch<any, UpdateOrderStatusRequest>(
    `${baseUrl}/company/:companyId/orders/:orderId/status`,
    async ({ params, request }) => {
      const { status } = await request.json();
      return updateStatus(params.orderId, status);
    }
  ),

  // POST /api/v1/orders/:orderId/payment
  http.post(`${baseUrl}/orders/:orderId/payment`, async ({ params, request }) => {
    const body = await request.json() as Record<string, string>;
    // Validate card fields exist (mock: always succeeds for demo)
    if (!body.cardNumber || !body.cardHolder || !body.expiry || !body.cvv) {
      return HttpResponse.json({ success: false, message: "Invalid card details" }, { status: 400 });
    }
    const order = findOrder(params.orderId);
    if (!order) return orderNotFound();
    // Payment recorded — status stays ACCEPTED until seller starts preparing
    return HttpResponse.json({ success: true, data: order });
  }),

  // GET /api/v1/company/:companyId/orders
  http.get(`${baseUrl}/company/:companyId/orders`, () => {
    return HttpResponse.json({
      success: true,
      data: db.orders,
      meta: { currentPage: 0, lastPage: 1, perPage: 20, total: db.orders.length },
    });
  }),
];
