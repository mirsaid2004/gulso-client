"use client";

import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrders } from "@/features/orders/api/get-orders";
import { OrderResponse, OrderStatus } from "@/types";
import { Image } from "@/components/ui/image";

type OrderHistoryProps = {
  detailed?: boolean;
};

const STATUS_ICONS: Record<OrderStatus, { icon: string; color: string }> = {
  [OrderStatus.ACCEPTED]: {
    icon: "material-symbols:check-circle-outline-rounded",
    color: "text-sky-600 bg-sky-100/50 border-sky-100",
  },
  [OrderStatus.PREPARING]: {
    icon: "material-symbols:blender-outline-rounded",
    color: "text-amber-600 bg-amber-100/50 border-amber-100",
  },
  [OrderStatus.IN_DELIVERY]: {
    icon: "material-symbols:local-shipping-rounded",
    color: "text-blue-600 bg-blue-100/50 border-blue-100",
  },
  [OrderStatus.COMPLETED]: {
    icon: "material-symbols:check-circle-rounded",
    color: "text-emerald-600 bg-emerald-100/50 border-emerald-100",
  },
  [OrderStatus.CANCELLED]: {
    icon: "material-symbols:cancel-outline-rounded",
    color: "text-rose-600 bg-rose-100/50 border-rose-100",
  },
};

const ACTIVE_STATUSES: OrderStatus[] = [
  OrderStatus.ACCEPTED,
  OrderStatus.PREPARING,
  OrderStatus.IN_DELIVERY,
];

function orderTitle(order: OrderResponse): string {
  if (!order.items.length) return `Order #${order.id}`;
  const first = order.items[0].productName;
  return order.items.length > 1 ? `${first} +${order.items.length - 1}` : first;
}

function orderDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const OrderHistory = ({ detailed = false }: OrderHistoryProps) => {
  const t = useTranslations("Profile");
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "cancelled">("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  const { data, isLoading } = useOrders();
  const allOrders: OrderResponse[] = data?.data ?? [];

  const filteredOrders =
    filter === "all"
      ? allOrders
      : filter === "active"
      ? allOrders.filter((o) => ACTIVE_STATUSES.includes(o.status))
      : filter === "completed"
      ? allOrders.filter((o) => o.status === OrderStatus.COMPLETED)
      : allOrders.filter((o) => o.status === OrderStatus.CANCELLED);

  const displayedOrders = detailed ? filteredOrders : filteredOrders.slice(0, 3);

  const filters = [
    { id: "all" as const, label: t("orders.filters.all") },
    { id: "active" as const, label: t("orders.filters.active") },
    { id: "completed" as const, label: t("orders.filters.completed") },
    { id: "cancelled" as const, label: t("orders.filters.cancelled") },
  ];

  const getStatusMeta = (status: OrderStatus) => ({
    ...STATUS_ICONS[status],
    label: t(`orders.statusLabels.${status}` as any),
  });

  return (
    <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between border-b-2 border-slate-50 pb-4">
          <h2 className="text-slate-900 text-xl font-black flex items-center gap-3 tracking-tight">
            <div className="w-10 h-10 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
              <Icon icon="material-symbols:orders-outline" className="w-6 h-6" />
            </div>
            {t("orders.title")}
            {allOrders.length > 0 && (
              <span className="text-sm font-bold text-slate-400">({allOrders.length})</span>
            )}
          </h2>
          {!detailed && (
            <Link href="/profile?tab=orders" className="text-primary text-sm font-black hover:underline tracking-wide">
              {t("orders.viewAll")}
            </Link>
          )}
        </div>

        {detailed && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
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

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-28 rounded-[2rem] bg-slate-50 animate-pulse" />
          ))}
        </div>
      ) : displayedOrders.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
            <Icon icon="material-symbols:shopping-bag-outline" className="w-10 h-10" />
          </div>
          <p className="text-slate-400 font-bold">{t("orders.empty")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {displayedOrders.map((order) => {
            const meta = getStatusMeta(order.status);
            const firstImage = order.items[0]?.productImageUrl;
            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="group bg-slate-50/50 hover:bg-white p-5 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer"
              >
                <div className="flex gap-6 items-center">
                  <div className="relative w-20 h-20 shrink-0 rounded-3xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500">
                    {firstImage ? (
                      <Image src={firstImage} alt={order.items[0].productName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <Icon icon="material-symbols:shopping-bag-outline" className="w-8 h-8" />
                      </div>
                    )}
                    {order.items.length > 1 && (
                      <div className="absolute -top-1 -right-2 z-20 bg-primary text-white px-2 py-0.5 rounded-xl text-[10px] font-black border-2 border-white shadow-xl shadow-primary/20">
                        {order.items.length}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                        ID #{order.id}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Icon icon="material-symbols:calendar-today-outline-rounded" className="w-3.5 h-3.5" />
                        {orderDate(order.createdAt)}
                      </span>
                    </div>
                    <p className="font-black text-base sm:text-lg text-slate-900 tracking-tight leading-tight">
                      {orderTitle(order)}
                    </p>
                    <p className="text-xs font-bold text-slate-400">
                      {new Date(order.deliveryDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                  <div className="flex flex-col md:items-end gap-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("orders.totalLabel")}</p>
                    <p className="font-black text-primary text-xl tracking-tighter">{order.totalAmount.toLocaleString()} {t("orders.currency")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border ${meta.color}`}>
                      <Icon icon={meta.icon} className="w-4 h-4" />
                      {meta.label}
                    </span>
                    <button className="hidden sm:flex w-12 h-12 items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm active:scale-95 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                      <Icon icon="material-symbols:chevron-right-rounded" className="w-7 h-7" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="p-0 border-none bg-white max-w-3xl w-[calc(100%-2rem)] sm:w-full rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col outline-none ring-0">
          <DialogHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/50 space-y-0">
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">{t("orders.detail.title")}</DialogTitle>
                <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-lg border border-primary/10 uppercase">
                  #{selectedOrder?.id}
                </span>
              </div>
              <p className="text-sm text-slate-400 font-bold flex items-center gap-2">
                <Icon icon="material-symbols:calendar-today-outline-rounded" className="w-4 h-4" />
                {t("orders.detail.orderedOn", { date: selectedOrder ? orderDate(selectedOrder.createdAt) : "" })}
              </p>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar max-h-[75vh]">
            {selectedOrder && (
              <div className="flex flex-col gap-8">
                {/* Status Banner */}
                {(() => {
                  const meta = getStatusMeta(selectedOrder.status);
                  return (
                    <div className={`p-6 rounded-[2rem] border flex items-center justify-between ${meta.color}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center shadow-sm">
                          <Icon icon={meta.icon} className="w-7 h-7" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{t("orders.detail.orderStatus")}</p>
                          <p className="text-lg font-black tracking-tight">{meta.label}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{t("orders.detail.delivery")}</p>
                        <p className="font-black tracking-tight">
                          {new Date(selectedOrder.deliveryDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Products List */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Icon icon="material-symbols:shopping-bag-outline" className="w-5 h-5 text-primary" />
                    {t("orders.detail.items", { count: selectedOrder.items.length })}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
                        {item.productImageUrl && (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500 relative">
                            <Image src={item.productImageUrl} alt={item.productName} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-900 truncate tracking-tight">{item.productName}</p>
                          <p className="text-xs font-bold text-slate-400">{t("orders.detail.quantity", { count: item.quantity })}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900 tracking-tight">{item.subtotal.toLocaleString()} {t("orders.currency")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-8 rounded-[2rem] bg-slate-900 text-white flex flex-col gap-4 shadow-xl shadow-slate-900/20">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <p className="text-sm font-bold text-slate-400">{t("orders.detail.subtotal")}</p>
                    <p className="font-black tracking-tight">{selectedOrder.totalAmount.toLocaleString()} {t("orders.currency")}</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <p className="text-sm font-bold text-slate-400">{t("orders.detail.shipping")}</p>
                    <p className="font-black text-emerald-400 tracking-tight">20,000 {t("orders.currency")}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("orders.detail.total")}</p>
                      <p className="text-3xl font-black tracking-tighter text-primary">
                        {(selectedOrder.totalAmount + 20000).toLocaleString()} {t("orders.currency")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
