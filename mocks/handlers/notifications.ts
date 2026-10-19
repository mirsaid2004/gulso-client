import { http, HttpResponse, ws } from "msw";
import { baseUrl } from "../instance";
import { db, nextId } from "../db";
import { notificationBus } from "../notificationBus";

// ── WebSocket handler ─────────────────────────────────────────────────────────
// MSW intercepts any WS connection whose URL matches this pattern.
const notificationSocket = ws.link("ws://*/api/v1/ws/notifications");

export const notificationWsHandlers = [
  notificationSocket.addEventListener("connection", ({ client }) => {
    // Ack the connection
    client.send(JSON.stringify({ type: "CONNECTED" }));

    // Forward any future bus emissions to this client
    const unsubscribe = notificationBus.subscribe((payload) => {
      client.send(JSON.stringify(payload));
    });

    client.addEventListener("close", unsubscribe);
  }),
];

// ── Helper: persist & broadcast a new notification ────────────────────────────
export function createAndBroadcast(notification: {
  type: "ORDER_STATUS" | "PRODUCT_REVIEW";
  orderId: number;
  orderItems: { id: number; productName: string; productImageUrl?: string }[];
  status?: string;
  productId?: number;
}) {
  const newEntry = {
    id: nextId(db.notifications),
    ...notification,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  db.notifications.push(newEntry);
  notificationBus.emit(newEntry);
  return newEntry;
}

// ── REST handlers ─────────────────────────────────────────────────────────────
export const notificationHandlers = [
  // GET /api/v1/notifications
  http.get(`${baseUrl}/notifications`, ({ request }) => {
    const url = new URL(request.url);
    const onlyUnread = url.searchParams.get("unread") === "true";

    let list = [...db.notifications];
    if (onlyUnread) list = list.filter((n) => !n.isRead);
    list = list.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return HttpResponse.json({ success: true, data: list });
  }),

  // PATCH /api/v1/notifications/:id/read
  http.patch(`${baseUrl}/notifications/:id/read`, ({ params }) => {
    const notification = db.notifications.find((n) => n.id === Number(params.id));
    if (!notification) return HttpResponse.json({ success: false, data: null }, { status: 404 });
    notification.isRead = true;
    return HttpResponse.json({ success: true, data: notification });
  }),

  // POST /api/v1/notifications/read-all
  http.post(`${baseUrl}/notifications/read-all`, () => {
    db.notifications.forEach((n) => (n.isRead = true));
    return HttpResponse.json({ success: true, data: null });
  }),
];
