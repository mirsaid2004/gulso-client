"use client";

import { useEffect } from "react";
import { useNotifications } from "./api/get-notifications";
import { useNotificationStore } from "./useNotificationStore";
import { NotificationResponse } from "@/types";

// Match the page protocol: browsers refuse ws:// from an https:// page.
const WS_URL =
  typeof window !== "undefined"
    ? `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/v1/ws/notifications`
    : "";

export function NotificationProvider() {
  const { data } = useNotifications();
  const { setAll, prepend } = useNotificationStore();

  // Merge polled data: prepend new items, keep local read state
  useEffect(() => {
    if (!data?.data) return;
    const incoming = data.data;
    const current = useNotificationStore.getState().notifications;
    if (current.length === 0) {
      setAll(incoming);
    } else {
      const knownIds = new Set(current.map((n) => n.id));
      const fresh = incoming.filter((n) => !knownIds.has(n.id));
      fresh.forEach((n) => prepend(n));
    }
  }, [data, setAll, prepend]);

  // WebSocket — receives live pushes from MSW
  useEffect(() => {
    if (!WS_URL) return;

    // The constructor throws synchronously (e.g. SecurityError); live
    // notifications are optional, so never let that take down the app.
    let socket: WebSocket;
    try {
      socket = new WebSocket(WS_URL);
    } catch {
      return;
    }

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as NotificationResponse & { type: string };
        // Skip the connection-ack message
        if ((payload as any).type === "CONNECTED") return;
        prepend(payload);
      } catch {
        // ignore malformed frames
      }
    };

    socket.onerror = () => {
      // Silently ignore — MSW may not be ready yet on hot reload
    };

    return () => {
      socket.close();
    };
  }, [prepend]);

  return null;
}
