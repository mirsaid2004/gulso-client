"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Bell } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Link, useRouter } from "@/i18n/routing";
import { StackedImages } from "@/components/blocks/StackedImages";
import { statusConfig } from "@/features/notifications/data";
import { useNotificationStore } from "@/features/notifications/useNotificationStore";
import { useMarkRead, useMarkAllRead } from "@/features/notifications/api/mark-read";
import { useCreateComment } from "@/features/comments/api/create-comment";
import { NotificationResponse } from "@/types";
import { useTranslations } from "next-intl";

function timeAgo(iso: string, t: ReturnType<typeof useTranslations>): string {
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

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Icon
            icon={(hovered || value) > i ? "material-symbols:star-rounded" : "material-symbols:star-outline-rounded"}
            className={`w-7 h-7 transition-colors ${(hovered || value) > i ? "text-amber-400" : "text-slate-200"}`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ n, t }: { n: NotificationResponse; t: ReturnType<typeof useTranslations> }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const productId = n.productId ?? n.orderItems[0]?.id;
  const productImage = n.orderItems[0]?.productImageUrl ?? "";
  const productName = n.orderItems[0]?.productName ?? `Order #${n.orderId}`;

  const ratingLabels = ["", t("reviewCard.ratings.poor"), t("reviewCard.ratings.fair"), t("reviewCard.ratings.good"), t("reviewCard.ratings.veryGood"), t("reviewCard.ratings.excellent")];

  const { mutate, isPending } = useCreateComment({
    productId: productId ?? 0,
    mutationConfig: {
      onSuccess: () => setSubmitted(true),
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
          <Icon icon="material-symbols:task-alt-rounded" className="w-8 h-8" />
        </div>
        <p className="font-black text-slate-900 text-sm">{t("reviewCard.submitted.title")}</p>
        <p className="text-xs text-slate-400 font-medium">{t("reviewCard.submitted.subtitle")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
          {productImage ? (
            <Image src={productImage} alt={productName} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
              <Icon icon="material-symbols:image-outline-rounded" className="w-6 h-6 text-slate-300" />
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">{t("reviewCard.rateYour")}</p>
          <p className="font-black text-slate-900 text-sm leading-snug">{productName}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <StarRating value={rating} onChange={setRating} />
        {rating > 0 && (
          <p className="text-[11px] font-bold text-amber-500">{ratingLabels[rating]}</p>
        )}
      </div>

      {rating > 0 && (
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("reviewCard.placeholder")}
          rows={2}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm resize-none focus:outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-300 animate-in fade-in duration-200"
        />
      )}

      {rating > 0 && (
        <button
          onClick={() => {
            if (isPending || !productId) return;
            mutate({ content: comment.trim() || `${ratingLabels[rating]} rating`, rating });
          }}
          disabled={isPending}
          className="self-start px-6 py-2.5 rounded-xl text-white text-[13px] font-black shadow-md shadow-primary/20 transition-all active:scale-95 animate-in fade-in duration-200 disabled:opacity-60 flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
        >
          {isPending ? <Icon icon="line-md:loading-twotone-loop" className="w-4 h-4" /> : t("reviewCard.submit")}
        </button>
      )}
    </div>
  );
}

const FILTER_IDS = ["all", "ORDER_STATUS", "PRODUCT_REVIEW"] as const;

type FilterId = (typeof FILTER_IDS)[number];

type Props = { detailed?: boolean };

export function NotificationsList({ detailed = false }: Props) {
  const t = useTranslations("Notifications");
  const router = useRouter();
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const { markRead, markAllRead } = useNotificationStore();

  const { mutate: apiMarkRead } = useMarkRead();
  const { mutate: apiMarkAllRead } = useMarkAllRead();

  const [filter, setFilter] = useState<FilterId>("all");

  const FILTERS = [
    { id: "all" as FilterId, label: t("filters.all") },
    { id: "ORDER_STATUS" as FilterId, label: t("filters.orders") },
    { id: "PRODUCT_REVIEW" as FilterId, label: t("filters.reviews") },
  ];

  const handleRead = (id: number) => {
    markRead(id);
    apiMarkRead(id);
  };

  const handleMarkAll = () => {
    markAllRead();
    apiMarkAllRead();
  };

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  const displayList = detailed ? filtered : notifications.slice(0, 3);

  const getGroups = () =>
    [
      { label: t("groups.new"), sublabel: null, items: filtered.filter((n) => !n.isRead) },
      { label: t("groups.earlier"), sublabel: t("groups.read"), items: filtered.filter((n) => n.isRead) },
    ].filter((g) => g.items.length > 0);

  const renderCard = (n: NotificationResponse) => {
    const isOrder = n.type === "ORDER_STATUS";
    const cfg = isOrder && n.status ? statusConfig[n.status as keyof typeof statusConfig] : null;
    const images = n.orderItems.map((i) => i.productImageUrl ?? "").filter(Boolean);
    const title =
      n.orderItems.length > 0
        ? n.orderItems.length === 1
          ? n.orderItems[0].productName
          : `${n.orderItems[0].productName} +${n.orderItems.length - 1}`
        : `Order #${n.orderId}`;

    const handleClick = () => {
      handleRead(n.id);
      if (!isOrder && n.productId) {
        router.push(`/product/${n.productId}` as any);
      } else {
        router.push("/profile?tab=orders" as any);
      }
    };

    return (
      <div
        key={n.id}
        className={`rounded-3xl border p-5 transition-all ${
          !n.isRead
            ? "border-primary/10 bg-primary/[0.02]"
            : "border-slate-100 bg-slate-50/40 hover:bg-white hover:shadow-md hover:shadow-slate-100"
        }`}
      >
        {isOrder && cfg ? (
          <div className="flex items-start gap-4">
            <StackedImages images={images.length ? images : [""]} count={n.orderItems.length} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-black border mb-2 ${cfg.colors}`}>
                    <Icon icon={cfg.icon} className="w-3.5 h-3.5 shrink-0" />
                    {cfg.label}
                  </div>
                  <p className="font-black text-slate-900 text-sm leading-snug">{title}</p>
                  <p className="text-[12px] text-slate-400 font-medium mt-1">Order #{n.orderId} · {cfg?.message}</p>
                </div>
                {!n.isRead && <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${cfg.dotColor}`} />}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[11px] font-bold text-slate-300">{timeAgo(n.createdAt, t)}</span>
                <button
                  onClick={handleClick}
                  className="text-[11px] font-black text-primary hover:underline flex items-center gap-0.5"
                >
                  {t("viewOrder")} <Icon icon="material-symbols:chevron-right-rounded" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                  <Icon icon="material-symbols:star-half-rounded" className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest">{t("reviewRequest")}</span>
              </div>
              <div className="flex items-center gap-2">
                {!n.isRead && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                <span className="text-[11px] font-bold text-slate-300">{timeAgo(n.createdAt, t)}</span>
              </div>
            </div>
            <ReviewCard n={n} t={t} />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b-2 border-slate-50 pb-5 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-slate-900 text-xl font-black flex items-center gap-3 tracking-tight">
            <div className="w-10 h-10 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            {t("title")}
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-primary text-white text-[11px] font-black rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          {detailed ? (
            <button
              onClick={handleMarkAll}
              disabled={unreadCount === 0}
              className={`text-sm font-bold transition-colors ${
                unreadCount > 0 ? "text-primary hover:underline" : "text-slate-300 cursor-default"
              }`}
            >
              {t("markAllRead")}
            </button>
          ) : (
            <Link href="/profile?tab=notifications" className="text-primary text-sm font-black hover:underline tracking-wide">
              {t("viewAll")}
            </Link>
          )}
        </div>
        {detailed && (
          <div className="flex items-center gap-2 mt-4">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === f.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {displayList.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
            <Bell className="w-10 h-10" />
          </div>
          <p className="text-slate-400 font-bold">{t("noNotificationsHere")}</p>
        </div>
      ) : detailed ? (
        <div className="flex flex-col gap-8">
          {getGroups().map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{group.label}</p>
                {group.sublabel && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-500 border border-emerald-100">
                    <Icon icon="material-symbols:check-circle-rounded" className="w-3 h-3" />
                    {group.sublabel}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">{group.items.map(renderCard)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">{displayList.map(renderCard)}</div>
      )}
    </section>
  );
}
