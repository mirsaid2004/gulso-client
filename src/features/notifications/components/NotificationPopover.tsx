"use client";

import { Bell } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Link } from "@/i18n/routing";
import { StackedImages } from "@/components/blocks/StackedImages";
import { useNotificationStore } from "../useNotificationStore";
import { useMarkAllRead, useMarkRead } from "../api/mark-read";
import { NotificationResponse } from "@/types";
import { statusConfig } from "../data";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

function NotificationRow({ n, onRead, t }: { n: NotificationResponse; onRead: (id: number) => void; t: ReturnType<typeof useTranslations> }) {
  const router = useRouter();
  const isOrder = n.type === "ORDER_STATUS";
  const cfg = isOrder && n.status ? statusConfig[n.status as keyof typeof statusConfig] : null;
  const images = n.orderItems.map((i) => i.productImageUrl ?? "").filter(Boolean);
  const title = n.orderItems.length > 0
    ? n.orderItems.length === 1
      ? n.orderItems[0].productName
      : `${n.orderItems[0].productName} +${n.orderItems.length - 1}`
    : `Order #${n.orderId}`;

  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60_000);
    if (m < 1) return t("timeAgo.justNow");
    if (m < 60) return t("timeAgo.minutesAgo", { count: m });
    const h = Math.floor(m / 60);
    if (h < 24) return t("timeAgo.hoursAgo", { count: h });
    const d = Math.floor(h / 24);
    if (d === 1) return t("timeAgo.yesterday");
    if (d < 7) return t("timeAgo.daysAgo", { count: d });
    return new Date(iso).toLocaleDateString();
  }

  const handleClick = () => {
    onRead(n.id);
    if (!isOrder && n.productId) {
      router.push(`/product/${n.productId}` as any);
    } else {
      router.push("/profile?tab=orders" as any);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left ${!n.isRead ? "bg-primary/[0.025]" : ""}`}
    >
      <StackedImages images={images.length ? images : [""]} count={n.orderItems.length} size="sm" />

      <div className="flex-1 min-w-0">
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black border mb-1 ${cfg ? cfg.colors : "text-amber-600 bg-amber-50 border-amber-100"}`}>
          <Icon icon={cfg ? cfg.icon : "material-symbols:star-half-rounded"} className="w-3 h-3 shrink-0" />
          {cfg ? cfg.label : t("reviewRequest")}
        </div>
        <p className="text-[13px] font-black text-slate-900 leading-snug truncate">{title}</p>
        <p className="text-[10px] font-bold text-slate-300 mt-0.5">
          Order #{n.orderId} · {timeAgo(n.createdAt)}
        </p>
      </div>

      {!n.isRead && (
        <div className={`w-2 h-2 rounded-full shrink-0 ${cfg ? cfg.dotColor : "bg-amber-400"}`} />
      )}
    </button>
  );
}

export function NotificationPopover() {
  const t = useTranslations("Notifications");
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const { markRead, markAllRead } = useNotificationStore();

  const { mutate: apiMarkRead } = useMarkRead();
  const { mutate: apiMarkAllRead } = useMarkAllRead();

  const handleRead = (id: number) => {
    markRead(id);
    apiMarkRead(id);
  };

  const handleMarkAll = () => {
    markAllRead();
    apiMarkAllRead();
  };

  const recent = notifications.filter((n) => !n.isRead).slice(0, 5);

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-all active:scale-95 hidden sm:flex"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 leading-none">
              {unreadCount}
            </span>
          )}
        </Button>
      </HoverCardTrigger>

      <HoverCardContent align="end" sideOffset={12} className="w-[380px] p-0 rounded-2xl border-primary/10 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-sm">{t("title")}</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded-full">
                {t("newCount", { count: unreadCount })}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={handleMarkAll} className="text-[11px] font-bold text-primary hover:underline">
              {t("markAllRead")}
            </button>
          )}
        </div>

        {/* List */}
        <div className="flex flex-col divide-y divide-slate-50 max-h-[380px] overflow-y-auto">
          {recent.length === 0 ? (
            <div className="py-10 flex flex-col items-center gap-3 text-slate-400">
              <Bell className="w-8 h-8 opacity-30" />
              <p className="text-sm font-bold">{t("noNotifications")}</p>
            </div>
          ) : (
            recent.map((n) => <NotificationRow key={n.id} n={n} onRead={handleRead} t={t} />)
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
          <Link
            href="/profile?tab=notifications"
            className="text-[12px] font-black text-primary hover:underline flex items-center justify-center gap-1"
          >
            {t("viewAll")}
            <Icon icon="material-symbols:arrow-forward-rounded" className="w-3.5 h-3.5" />
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
