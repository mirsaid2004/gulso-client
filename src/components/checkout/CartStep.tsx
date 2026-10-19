"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { Image } from "@/components/ui/image";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/features/cart/useCartStore";
import { useCreateOrder } from "@/features/orders/api/create-order";
import { useUser } from "@/features/auth/api/get-user";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { DeliveryType, OrderResponse } from "@/types";
import { MapPickerModal } from "./MapPickerModal";

// ─── Phone helpers ────────────────────────────────────────────────────────────
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").substring(0, 9);
  const p1 = digits.substring(0, 2);
  const p2 = digits.substring(2, 5);
  const p3 = digits.substring(5, 7);
  const p4 = digits.substring(7, 9);
  if (digits.length > 7) return `${p1} ${p2} ${p3} ${p4}`;
  if (digits.length > 5) return `${p1} ${p2} ${p3}`;
  if (digits.length > 2) return `${p1} ${p2}`;
  return p1;
}

// Strip +998 prefix to get the 9-digit portion for display
function phoneToLocal(full: string): string {
  const digits = full.replace(/\D/g, "");
  // Could be 998XXXXXXXXX (12 digits) or just 9 digits
  const local = digits.startsWith("998") ? digits.slice(3) : digits;
  return formatPhone(local);
}

// ─── Zod schema ───────────────────────────────────────────────────────────────
const schema = z
  .object({
    recipientName: z.string().min(2, "Name is required"),
    recipientPhone: z
      .string()
      .regex(/^\d{2} \d{3} \d{2} \d{2}$/, "Enter valid phone: XX XXX XX XX"),
    deliveryAddress: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    deliveryDate: z.string().min(1, "Date is required"),
    deliveryTime: z.string().min(1, "Time is required"),
    comment: z.string().optional(),
  })
  .superRefine((_data, _ctx) => {
    // deliveryAddress presence is checked in handleSubmit based on live store state
  });

type FormValues = z.infer<typeof schema>;

const TIME_SLOTS = ["09:00 - 12:00", "12:00 - 15:00", "15:00 - 18:00", "18:00 - 21:00"];

// ─── Component ────────────────────────────────────────────────────────────────
interface CartStepProps {
  onNext: (order: OrderResponse) => void;
}

export function CartStep({ onNext }: CartStepProps) {
  const t = useTranslations("Checkout.cart");
  const { status } = useSession();
  const router = useRouter();
  const { data: userRes } = useUser();
  const user = userRes?.data;

  const {
    items,
    removeItem,
    incrementItem,
    decrementItem,
    toggleDelivery,
    totalItems,
    totalPrice,
    totalDiscount,
    needsDelivery,
    clear,
  } = useCartStore();

  const { mutate: createOrder, isPending } = useCreateOrder();
  const [mapOpen, setMapOpen] = useState(false);

  const SHIPPING = 20000;
  const subtotal = totalPrice();
  const discount = totalDiscount();
  const total = subtotal + SHIPPING - discount;
  const requiresAddress = needsDelivery();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipientName: user?.name ?? "",
      recipientPhone: user?.phone ? phoneToLocal(user.phone) : "",
      deliveryAddress: "",
      deliveryTime: TIME_SLOTS[0],
      comment: "",
    },
  });

  const deliveryAddress = watch("deliveryAddress");
  const lat = watch("lat");
  const lng = watch("lng");

  const onSubmit = handleSubmit((data) => {
    if (requiresAddress && !data.deliveryAddress) {
      return; // let HTML5 validation show
    }

    // Build ISO date from date + time slot
    const [startHour] = (data.deliveryTime ?? "09:00").split(":");
    const dateObj = new Date(data.deliveryDate);
    dateObj.setHours(Number(startHour), 0, 0, 0);

    createOrder(
      {
        recipientName: data.recipientName,
        recipientPhone: `+998${data.recipientPhone.replace(/\s/g, "")}`,
        deliveryAddress: data.deliveryAddress ?? "",
        latitude: data.lat ?? 0,
        longitude: data.lng ?? 0,
        deliveryDate: dateObj.toISOString(),
        deliveryType: requiresAddress ? DeliveryType.DELIVERY : DeliveryType.PICKUP,
        comment: data.comment,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      },
      {
        onSuccess: (res) => {
          clear();
          onNext(res.data);
        },
      }
    );
  });

  return (
    <>
      <MapPickerModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        initialLat={lat}
        initialLng={lng}
        onConfirm={(lat, lng, label) => {
          setValue("lat", lat);
          setValue("lng", lng);
          setValue("deliveryAddress", label, { shouldValidate: true });
        }}
      />

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ── Left Column ── */}
          <div className="lg:col-span-8 space-y-10">

            {/* Notification */}
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
              <Icon icon="material-symbols:info-rounded" className="text-primary mt-1 shrink-0 w-6 h-6" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm tracking-tight mb-1">{t("notification.title")}</h4>
                <p className="text-[13px] font-medium text-slate-600 leading-relaxed">{t("notification.message")}</p>
              </div>
            </div>

            {/* Cart Items */}
            <section className="space-y-5">
              <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon icon="material-symbols:shopping-cart-rounded" className="w-5 h-5" />
                </div>
                {t("title")}
              </h2>

              {items.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-100 py-16 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                    <Icon icon="material-symbols:shopping-cart-off-rounded" className="w-10 h-10" />
                  </div>
                  <p className="text-slate-400 font-bold">Your cart is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                  {items.map((item) => (
                    <div key={item.id} className="p-5 sm:p-6 flex flex-wrap md:flex-nowrap items-center gap-5">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100 shadow-sm relative">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="font-black text-base text-slate-900 truncate">{item.title}</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {t("seller")}: <span className="text-primary ml-1">{item.store}</span>
                        </p>
                        <div className="flex items-baseline gap-2 pt-0.5">
                          <p className="text-primary font-black text-lg tracking-tight">
                            {item.price.toLocaleString()} {t("summary.currency")}
                          </p>
                          {item.originalPrice && (
                            <p className="text-slate-400 text-xs line-through font-medium">
                              {item.originalPrice.toLocaleString()} {t("summary.currency")}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Delivery toggle */}
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Delivery</span>
                        <button
                          type="button"
                          onClick={() => toggleDelivery(item.id)}
                          className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${
                            item.delivery ? "bg-primary" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                              item.delivery ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-1 py-1 rounded-2xl shadow-sm shrink-0">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.id)}
                          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all active:scale-95"
                        >
                          <Icon icon="material-symbols:remove-rounded" className="w-5 h-5" />
                        </button>
                        <span className="font-black text-base w-5 text-center text-slate-800">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => incrementItem(item.id)}
                          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all active:scale-95"
                        >
                          <Icon icon="material-symbols:add-rounded" className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors active:scale-95 shrink-0"
                      >
                        <Icon icon="material-symbols:delete-outline-rounded" className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Delivery Form */}
            <section className="space-y-5">
              <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon icon="material-symbols:local-shipping-rounded" className="w-5 h-5" />
                </div>
                {t("form.title")}
              </h2>
              <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{t("form.name")}</label>
                    <input
                      {...register("recipientName")}
                      className={`w-full px-5 py-3.5 rounded-2xl border-2 bg-slate-50/50 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium ${
                        errors.recipientName ? "border-rose-300 focus:border-rose-400" : "border-slate-100 focus:border-primary/40"
                      }`}
                      placeholder={t("form.namePlaceholder")}
                    />
                    {errors.recipientName && (
                      <p className="text-xs font-bold text-rose-500 pl-1">{errors.recipientName.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{t("form.phone")}</label>
                    <div className={`flex items-center rounded-2xl border-2 bg-slate-50/50 focus-within:bg-white focus-within:ring-0 transition-all overflow-hidden ${
                      errors.recipientPhone ? "border-rose-300 focus-within:border-rose-400" : "border-slate-100 focus-within:border-primary/40"
                    }`}>
                      <span className="pl-5 pr-2 py-3.5 font-bold text-slate-500 text-sm shrink-0 select-none">+998</span>
                      <Controller
                        name="recipientPhone"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="tel"
                            value={field.value}
                            onChange={(e) => field.onChange(formatPhone(e.target.value))}
                            placeholder="90 123 45 67"
                            className="flex-1 pr-5 py-3.5 bg-transparent focus:outline-none font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium"
                          />
                        )}
                      />
                    </div>
                    {errors.recipientPhone && (
                      <p className="text-xs font-bold text-rose-500 pl-1">{errors.recipientPhone.message}</p>
                    )}
                  </div>

                  {/* Delivery Address — only when at least one item has delivery=true */}
                  {requiresAddress && (
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{t("form.address")}</label>
                      <div
                        className={`relative cursor-pointer rounded-2xl border-2 bg-slate-50/50 hover:bg-white transition-all ${
                          errors.deliveryAddress ? "border-rose-300" : "border-slate-100 hover:border-primary/30"
                        }`}
                        onClick={() => setMapOpen(true)}
                      >
                        <Icon icon="material-symbols:location-on-outline-rounded" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                        <div className="pl-12 pr-5 py-3.5 font-bold text-sm">
                          {deliveryAddress ? (
                            <span className="text-slate-800">{deliveryAddress}</span>
                          ) : (
                            <span className="text-slate-300">{t("form.addressPlaceholder")}</span>
                          )}
                        </div>
                        <Icon icon="material-symbols:map-outline-rounded" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5 pointer-events-none" />
                      </div>
                      {errors.deliveryAddress && (
                        <p className="text-xs font-bold text-rose-500 pl-1">{errors.deliveryAddress.message}</p>
                      )}
                    </div>
                  )}

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{t("form.date")}</label>
                    <input
                      type="date"
                      {...register("deliveryDate")}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-5 py-3.5 rounded-2xl border-2 bg-slate-50/50 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-slate-800 ${
                        errors.deliveryDate ? "border-rose-300 focus:border-rose-400" : "border-slate-100 focus:border-primary/40"
                      }`}
                    />
                    {errors.deliveryDate && (
                      <p className="text-xs font-bold text-rose-500 pl-1">{errors.deliveryDate.message}</p>
                    )}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{t("form.time")}</label>
                    <div className="relative">
                      <select
                        {...register("deliveryTime")}
                        className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800 cursor-pointer appearance-none"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <Icon icon="material-symbols:expand-more-rounded" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{t("form.comment")}</label>
                    <textarea
                      {...register("comment")}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium resize-none"
                      placeholder={t("form.commentPlaceholder")}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right Column: Summary ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white rounded-4xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
              <h3 className="text-xl font-black border-b-2 border-slate-50 pb-5 tracking-tight flex items-center justify-between">
                {t("summary.title")}
                <Icon icon="material-symbols:receipt-long-outline-rounded" className="text-slate-300 w-6 h-6" />
              </h3>

              <div className="space-y-4 font-bold text-[15px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t("summary.items", { count: totalItems() })}</span>
                  <span className="text-slate-900 tracking-tight">{subtotal.toLocaleString()} {t("summary.currency")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t("summary.shipping")} <Icon icon="material-symbols:info-outline-rounded" className="inline w-4 h-4 mb-0.5 text-slate-300" /></span>
                  <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{SHIPPING.toLocaleString()} {t("summary.currency")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t("summary.discount")} <Icon icon="material-symbols:local-activity-outline-rounded" className="inline w-4 h-4 mb-0.5 text-slate-300" /></span>
                    <span className="text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">-{discount.toLocaleString()} {t("summary.currency")}</span>
                  </div>
                )}
              </div>

              <div className="w-full border-t-2 border-dashed border-slate-100" />

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{t("summary.total")}:</span>
                <span className="text-4xl font-black text-primary leading-none tracking-tighter">
                  {total.toLocaleString()} <span className="text-xl font-bold tracking-normal uppercase">{t("summary.currency")}</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={items.length === 0 || isPending || status === 'loading'}
                onClick={(e) => {
                  if (status === 'unauthenticated') {
                    e.preventDefault();
                    router.push('/login?redirect=/checkout');
                  }
                }}
                className="w-full bg-primary hover:bg-primary/95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isPending ? (
                  <Icon icon="material-symbols:progress-activity" className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span>{t("summary.buy")}</span>
                    <Icon icon="material-symbols:arrow-forward-rounded" className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 bg-slate-50 py-3 rounded-xl border border-slate-100">
                <Icon icon="material-symbols:verified-user-outline-rounded" className="text-emerald-500 w-5 h-5" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-0.5">{t("summary.secure")}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
