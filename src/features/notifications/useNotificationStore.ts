import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { NotificationResponse } from "@/types";

interface NotificationState {
  notifications: NotificationResponse[];
  setAll: (list: NotificationResponse[]) => void;
  prepend: (n: NotificationResponse) => void;
  markRead: (id: number) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  immer((set, get) => ({
    notifications: [],

    setAll: (list) =>
      set((s) => {
        s.notifications = list;
      }),

    prepend: (n) =>
      set((s) => {
        // avoid duplicates if already present
        if (!s.notifications.find((x) => x.id === n.id)) {
          s.notifications.unshift(n);
        }
      }),

    markRead: (id) =>
      set((s) => {
        const n = s.notifications.find((x) => x.id === id);
        if (n) n.isRead = true;
      }),

    markAllRead: () =>
      set((s) => {
        s.notifications.forEach((n) => { n.isRead = true; });
      }),

    unreadCount: () => get().notifications.filter((n) => !n.isRead).length,
  }))
);
