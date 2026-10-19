"use client";

import { Icon } from "@iconify/react";
import { Image } from "@/components/ui/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { OrderResponse } from "@/types";

const SHIPPING = 20000;

interface ReceiptStepProps {
    order: OrderResponse | null;
    onHome: () => void;
}

export function ReceiptStep({ order, onHome }: ReceiptStepProps) {
    const t = useTranslations("Checkout.receipt");
    const tCart = useTranslations("Checkout.cart");
    const tFooter = useTranslations("Layout.footer");

    const total = order ? order.totalAmount + SHIPPING : 0;
    const formattedDate = order
        ? new Date(order.deliveryDate).toLocaleDateString("uz-UZ", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "";

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#f8f6f7] overflow-x-hidden">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white/50 backdrop-blur-md px-6 py-4 lg:px-40 sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-4 text-primary group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon icon="material-symbols:local-florist-rounded" className="text-2xl" />
                    </div>
                    <h2 className="text-slate-900 text-2xl font-black tracking-tight group-hover:text-primary transition-colors">Gulso 1.0</h2>
                </Link>
                <button onClick={onHome} className="flex items-center justify-center rounded-xl h-12 w-12 bg-primary/10 text-primary transition-colors hover:bg-primary/20 active:scale-95">
                    <Icon icon="material-symbols:close-rounded" className="w-6 h-6" />
                </button>
            </header>

            <main className="flex-1 flex justify-center py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col w-full max-w-[600px] flex-1">
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-primary/20">
                            <Icon icon="material-symbols:check-circle-rounded" className="text-6xl text-primary animate-in zoom-in duration-500 delay-150" />
                        </div>
                        <h1 className="text-slate-900 tracking-tight text-4xl font-black leading-tight">{t("title")}</h1>
                        {order && (
                            <p className="text-primary font-black mt-3 bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/10 tracking-wider">
                                {t("orderNumber", { number: `GS-${String(order.id).padStart(5, "0")}` })}
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 mb-6 space-y-8 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />

                        {/* Order Items */}
                        {order && order.items.length > 0 && (
                            <div>
                                <h3 className="text-xl font-black mb-5 border-b-2 border-slate-50 pb-4 flex items-center gap-3">
                                    <Icon icon="material-symbols:shopping-bag-outline" className="text-primary" />
                                    Items ({order.items.length})
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            {item.productImageUrl && (
                                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 shrink-0 relative">
                                                    <Image src={item.productImageUrl} alt={item.productName} fill className="object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-900 text-sm truncate">{item.productName}</p>
                                                <p className="text-xs text-slate-400 font-bold">x{item.quantity}</p>
                                            </div>
                                            <p className="font-black text-slate-900 text-sm shrink-0">{item.subtotal.toLocaleString()} {tCart("summary.currency")}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Summary */}
                        <div>
                            <h3 className="text-xl font-black mb-6 border-b-2 border-slate-50 pb-4 flex items-center gap-3">
                                <Icon icon="material-symbols:receipt-long-outline-rounded" className="text-primary" />
                                {t("details")}
                            </h3>
                            <div className="space-y-4 font-bold text-[15px]">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">{t("itemsPrice")}</span>
                                    <span className="text-slate-900 tracking-tight">{(order?.totalAmount ?? 0).toLocaleString()} {tCart("summary.currency")}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">{t("shipping")}</span>
                                    <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{SHIPPING.toLocaleString()} {tCart("summary.currency")}</span>
                                </div>
                                <div className="flex justify-between items-center pt-5 border-t-2 border-dashed border-slate-100 mt-2">
                                    <span className="text-lg font-black text-slate-400 uppercase tracking-widest">{t("total")}</span>
                                    <span className="text-3xl font-black text-primary tracking-tighter">{total.toLocaleString()} <span className="text-sm">{tCart("summary.currency")}</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery info */}
                        {order && (
                            <div>
                                <h3 className="text-xl font-black mb-6 border-b-2 border-slate-50 pb-4 flex items-center gap-3 mt-8">
                                    <Icon icon="material-symbols:local-shipping-outline-rounded" className="text-primary" />
                                    {t("deliveryInfo")}
                                </h3>
                                <div className="space-y-6">
                                    {order.deliveryAddress && (
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <Icon icon="material-symbols:location-on-outline-rounded" className="w-5 h-5" />
                                            </div>
                                            <div className="pt-0.5">
                                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">{t("address")}</p>
                                                <p className="font-bold text-slate-900 leading-relaxed text-[15px]">{order.deliveryAddress}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <Icon icon="material-symbols:schedule-outline-rounded" className="w-5 h-5" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">{t("time")}</p>
                                            <p className="font-bold text-slate-900 text-[15px]">{formattedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <Icon icon="material-symbols:payments-outline-rounded" className="w-5 h-5" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">{t("paymentMethod")}</p>
                                            <p className="font-bold text-slate-900 text-[15px]">{t("cashOnDelivery")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        <button onClick={onHome} className="flex w-full items-center justify-center gap-2 rounded-2xl h-14 bg-primary text-white font-black transition-all active:scale-[0.98] shadow-lg shadow-primary/20 hover:bg-primary/95 text-base">
                            <Icon icon="material-symbols:home-outline-rounded" className="w-6 h-6" />
                            {t("backHome")}
                        </button>
                    </div>

                    <p className="text-center text-xs font-bold text-slate-400 mt-6 bg-slate-100 py-3 px-6 rounded-full inline-flex self-center gap-2 items-center">
                        <Icon icon="material-symbols:info-outline-rounded" className="w-4 h-4" />
                        {t("info")}
                    </p>
                </div>
            </main>

            <footer className="py-6 sm:py-8 text-center text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                {tFooter("rights", { year: new Date().getFullYear() })}
            </footer>
        </div>
    );
}
