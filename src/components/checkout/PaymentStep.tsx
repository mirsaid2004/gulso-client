"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { usePayOrder } from "@/features/orders/api/pay-order";
import { OrderResponse } from "@/types";

// ─── Card formatting helpers ──────────────────────────────────────────────────
function formatCardNumber(v: string) {
  const d = v.replace(/\D/g, "").substring(0, 16);
  return d.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").substring(0, 4);
  if (d.length > 2) return `${d.slice(0, 2)} / ${d.slice(2)}`;
  return d;
}

// ─── Zod schema ───────────────────────────────────────────────────────────────
const schema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Enter 16-digit card number"),
  cardHolder: z.string().min(3, "Cardholder name is required"),
  expiry: z
    .string()
    .regex(/^\d{2} \/ \d{2}$/, "Enter MM / YY"),
  cvv: z
    .string()
    .regex(/^\d{3}$/, "CVV must be 3 digits"),
});

type FormValues = z.infer<typeof schema>;

const SHIPPING = 20000;

interface PaymentStepProps {
  order: OrderResponse | null;
  onSuccess: (order: OrderResponse) => void;
}

export function PaymentStep({ order, onSuccess }: PaymentStepProps) {
  const tWizard = useTranslations("Checkout.wizard");
  const tPayment = useTranslations("Checkout.payment");
  const tCart = useTranslations("Checkout.cart");
  const { mutate: payOrder, isPending } = usePayOrder();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const total = order ? order.totalAmount + SHIPPING : 0;

  const onSubmit = handleSubmit((data) => {
    if (!order) return;
    payOrder(
      { orderId: order.id, ...data },
      { onSuccess: (res) => onSuccess(res.data) }
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Column */}
      <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">

        {/* Progress */}
        <div className="flex items-center justify-between max-w-sm mb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border-2 border-primary">
              <Icon icon="material-symbols:check-rounded" className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-primary">{tWizard("steps.cart")}</span>
          </div>
          <div className="h-0.5 flex-1 bg-primary mx-4" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black shadow-md shadow-primary/20">2</div>
            <span className="text-[11px] font-black uppercase tracking-widest text-primary">{tWizard("steps.payment")}</span>
          </div>
          <div className="h-0.5 flex-1 bg-slate-100 mx-4" />
          <div className="flex flex-col items-center gap-2 opacity-50 grayscale">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black">3</div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{tWizard("steps.receipt")}</span>
          </div>
        </div>

        {/* Payment form */}
        <div className="bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Icon icon="material-symbols:credit-card-outline-rounded" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">{tPayment("title")}</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{tPayment("description")}</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Card Number */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{tPayment("cardNumber")}</label>
              <div className="relative">
                <input
                  {...register("cardNumber")}
                  onChange={(e) => setValue("cardNumber", formatCardNumber(e.target.value), { shouldValidate: true })}
                  value={watch("cardNumber") ?? ""}
                  className={`w-full h-16 pl-5 pr-24 rounded-2xl border-2 bg-slate-50/50 focus:bg-white focus:ring-0 outline-none transition-all font-black text-slate-800 text-lg sm:text-2xl tracking-[0.2em] placeholder:text-slate-300 ${
                    errors.cardNumber ? "border-rose-300 focus:border-rose-400" : "border-slate-100 focus:border-primary/40"
                  }`}
                  placeholder="0000 0000 0000 0000"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <div className="bg-blue-600 w-10 h-6 rounded flex items-center justify-center font-black text-[9px] text-white italic">VISA</div>
                  <div className="bg-[#EB001B] w-5 h-5 rounded-full" style={{ boxShadow: "8px 0 0 #F79E1B, 4px 0 0 #FF5F00" }} />
                </div>
              </div>
              {errors.cardNumber && <p className="text-xs font-bold text-rose-500 pl-1">{errors.cardNumber.message}</p>}
            </div>

            {/* Cardholder */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{tPayment("cardholder")}</label>
              <input
                {...register("cardHolder")}
                className={`w-full h-14 px-5 rounded-2xl border-2 bg-slate-50/50 focus:bg-white focus:ring-0 outline-none transition-all font-black text-slate-800 uppercase placeholder:text-slate-300 tracking-wider ${
                  errors.cardHolder ? "border-rose-300 focus:border-rose-400" : "border-slate-100 focus:border-primary/40"
                }`}
                placeholder={tPayment("cardholderPlaceholder")}
              />
              {errors.cardHolder && <p className="text-xs font-bold text-rose-500 pl-1">{errors.cardHolder.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Expiry */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">{tPayment("expiry")}</label>
                <input
                  {...register("expiry")}
                  onChange={(e) => setValue("expiry", formatExpiry(e.target.value), { shouldValidate: true })}
                  value={watch("expiry") ?? ""}
                  className={`w-full h-14 px-5 rounded-2xl border-2 bg-slate-50/50 focus:bg-white focus:ring-0 outline-none transition-all font-black text-slate-800 text-center text-xl tracking-[0.2em] placeholder:text-slate-300 ${
                    errors.expiry ? "border-rose-300 focus:border-rose-400" : "border-slate-100 focus:border-primary/40"
                  }`}
                  placeholder="MM / YY"
                />
                {errors.expiry && <p className="text-xs font-bold text-rose-500 pl-1">{errors.expiry.message}</p>}
              </div>

              {/* CVV */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center justify-between">
                  {tPayment("cvv")}
                  <Icon icon="material-symbols:help-outline-rounded" className="w-4 h-4 cursor-help" />
                </label>
                <input
                  {...register("cvv")}
                  type="password"
                  maxLength={3}
                  className={`w-full h-14 px-5 rounded-2xl border-2 bg-slate-50/50 focus:bg-white focus:ring-0 outline-none transition-all font-black text-slate-800 text-center text-xl tracking-[0.5em] placeholder:text-slate-300 ${
                    errors.cvv ? "border-rose-300 focus:border-rose-400" : "border-slate-100 focus:border-primary/40"
                  }`}
                  placeholder="***"
                />
                {errors.cvv && <p className="text-xs font-bold text-rose-500 pl-1">{errors.cvv.message}</p>}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary/95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4.5 rounded-2xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isPending ? (
                  <Icon icon="material-symbols:progress-activity" className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Icon icon="material-symbols:lock-rounded" className="w-6 h-6" />
                    {tPayment("payButton", { amount: total.toLocaleString() })}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust badges */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-4 sm:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-1.5">
              <Icon icon="material-symbols:security-rounded" className="w-5 h-5" />
              <span className="text-[10px] font-black tracking-widest">PCI COMPLIANT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="material-symbols:verified-user-rounded" className="w-5 h-5" />
              <span className="text-[10px] font-black tracking-widest">256-BIT SSL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Summary */}
      <div className="lg:col-span-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-150 fill-mode-both">
        <div className="sticky top-32 bg-white rounded-4xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
          <h3 className="text-xl font-black border-b-2 border-slate-50 pb-5 tracking-tight flex items-center justify-between">
            {tCart("summary.title")}
            <Icon icon="material-symbols:receipt-long-outline-rounded" className="text-slate-300 w-6 h-6" />
          </h3>

          {order && (
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-800 truncate">{item.productName}</p>
                    <p className="text-xs font-bold text-slate-400">x{item.quantity}</p>
                  </div>
                  <p className="font-black text-sm text-slate-900 shrink-0">{item.subtotal.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          <div className="w-full border-t-2 border-dashed border-slate-100" />

          <div className="space-y-3 font-bold text-[15px]">
            <div className="flex justify-between">
              <span className="text-slate-500">{tCart("summary.shipping")}</span>
              <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{SHIPPING.toLocaleString()} {tCart("summary.currency")}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest self-end">{tCart("summary.total")}</span>
              <span className="text-3xl font-black text-primary tracking-tighter">{total.toLocaleString()} <span className="text-base">{tCart("summary.currency")}</span></span>
            </div>
          </div>

          <div className="mt-4 bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <div className="flex gap-4">
              <div className="bg-primary/10 w-10 h-10 rounded-xl text-primary flex items-center justify-center shrink-0">
                <Icon icon="material-symbols:support-agent-rounded" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 tracking-tight">{tCart("summary.help.title")}</p>
                <a className="text-xs font-black text-primary mt-2 flex items-center gap-1 hover:underline" href="tel:+998712000000">
                  <Icon icon="material-symbols:call-rounded" className="w-4 h-4" />
                  +998 71 200 00 00
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
