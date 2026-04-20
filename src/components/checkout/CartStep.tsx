"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

export function CartStep({ onNext }: { onNext: (method: 'cash' | 'card') => void }) {
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Items & Form */}
            <div className="lg:col-span-8 space-y-10">

                {/* Notification Box */}
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
                    <Icon icon="material-symbols:info-rounded" className="text-primary mt-1 shrink-0 w-6 h-6" />
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm tracking-tight mb-1">Diqqat</h4>
                        <p className="text-[13px] font-medium text-slate-600 leading-relaxed">Tovarlar turli sotuvchilardan yetkazilishi mumkin, lekin bitta buyurtmada rasmiylashtiriladi.</p>
                    </div>
                </div>

                {/* Cart Items Section */}
                <section className="space-y-5">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary blur-none">
                            <Icon icon="material-symbols:shopping-cart-rounded" className="w-5 h-5" />
                        </div>
                        Savatdagi mahsulotlar
                    </h2>
                    <div className="divide-y divide-slate-100 bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)]">

                        {/* Item 1 */}
                        <div className="p-5 sm:p-6 flex flex-wrap md:flex-nowrap items-center gap-6">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100 shadow-sm relative">
                                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuANlEHokV9zcqZJy6eriNN3IcYBZ4uAL5ssiHtVVQoQ4sBXc5vf2kFsttAKxe5wWJ54hIhGNFkUy8sF2qiyRpKJZ0urr0G8xNUPVboLr4UDe-Fz-E8DHWa05EXAqu0ColxXXX9Tz2jLGNDZRhe63J-QS7gxqUOavpVCl6775LYGmnFX_UAzt3Cv2Kpu7k-AhmVi6dydrzp6Ck9X_zJ4VnGzbsQlfVbyaZVY1MYdO8rw5SJi6qPscYlhsqEc3GLs_JnW8iZp7g6YifVs" alt="Qizil atirgullar" fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                                <h3 className="font-black text-lg text-slate-900 truncate">Qizil atirgullar "Premium"</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sotuvchi: <span className="text-primary ml-1">Gulshan Bog'i</span></p>
                                <p className="text-primary font-black pt-1 text-xl tracking-tight">250 000 so'm</p>
                            </div>
                            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-1 py-1 rounded-2xl shadow-sm focus-within:border-primary/30 transition-colors">
                                <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all active:scale-95 shadow-sm">
                                    <Icon icon="material-symbols:remove-rounded" className="w-5 h-5" />
                                </button>
                                <span className="font-black text-lg w-6 text-center text-slate-800">1</span>
                                <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all active:scale-95 shadow-sm">
                                    <Icon icon="material-symbols:add-rounded" className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors active:scale-95">
                                <Icon icon="material-symbols:delete-outline-rounded" className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Item 2 */}
                        <div className="p-5 sm:p-6 flex flex-wrap md:flex-nowrap items-center gap-6">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100 shadow-sm relative">
                                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3lbeb4OZQeNBxc9XjuwbBn9i7Os62vS71-3r4c_gY80jeKjsjyJY4l0uiYKb0CF0dNcWpT9wL8tuGtmg2ynVGFoR5BN4miyOuFncDoSue9KTs19fh1jyPS77ehD3Y3I38lnooutqqiLvUjzZRORICzejX5n9nLIWHSnioxkcU7p5LScY-7-aGqjOIYjWo7b3EcLykI-_ktUgVmgC5cEru2rnQ_H0wzokRqv-GtNArLxwatOYdrw8qC37wja12dBB_R3Zwybbus9bG" alt="Oq liliyalar dastasi" fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                                <h3 className="font-black text-lg text-slate-900 truncate">Oq liliyalar dastasi</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sotuvchi: <span className="text-primary ml-1">Zebuniso Flora</span></p>
                                <p className="text-primary font-black pt-1 text-xl tracking-tight">180 000 so'm</p>
                            </div>
                            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-1 py-1 rounded-2xl shadow-sm focus-within:border-primary/30 transition-colors">
                                <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all active:scale-95 shadow-sm">
                                    <Icon icon="material-symbols:remove-rounded" className="w-5 h-5" />
                                </button>
                                <span className="font-black text-lg w-6 text-center text-slate-800">2</span>
                                <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all active:scale-95 shadow-sm">
                                    <Icon icon="material-symbols:add-rounded" className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors active:scale-95">
                                <Icon icon="material-symbols:delete-outline-rounded" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Checkout Form Section */}
                <section className="space-y-5">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary blur-none">
                            <Icon icon="material-symbols:local-shipping-rounded" className="w-5 h-5" />
                        </div>
                        Yetkazib berish ma'lumotlari
                    </h2>
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Qabul qiluvchi ismi</label>
                                <input className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium" placeholder="Ismingizni kiriting" type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Telefon raqami</label>
                                <input className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium" placeholder="+998 90 123 45 67" type="tel" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Yetkazib berish manzili</label>
                                <div className="relative">
                                    <Icon icon="material-symbols:location-on-outline-rounded" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                                    <input className="w-full pl-12 pr-5 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium" placeholder="Ko'cha, uy, xonadon raqami" type="text" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Sana</label>
                                <input className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800" type="date" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Vaqti</label>
                                <select className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800 cursor-pointer appearance-none">
                                    <option>09:00 - 12:00</option>
                                    <option>12:00 - 15:00</option>
                                    <option>15:00 - 18:00</option>
                                    <option>18:00 - 21:00</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Izoh (ixtiyoriy)</label>
                                <textarea className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium resize-none" placeholder="Masalan: Uy kodi 123, pod'yezd oldiga qo'yib keting" rows={3}></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Payment Method Section */}
                <section className="space-y-5">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary blur-none">
                            <Icon icon="material-symbols:payments-rounded" className="w-5 h-5" />
                        </div>
                        To'lov usuli
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Cash Method */}
                        <button
                            onClick={() => setPaymentMethod('cash')}
                            className={`group relative overflow-hidden text-left bg-white border-2 rounded-3xl p-6 transition-all shadow-sm active:scale-[0.98] ${paymentMethod === 'cash' ? 'border-primary ring-4 ring-primary/10 shadow-primary/10' : 'border-slate-100 hover:border-slate-300'}`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${paymentMethod === 'cash' ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                    <Icon icon="material-symbols:account-balance-wallet-outline-rounded" className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-black tracking-tight ${paymentMethod === 'cash' ? 'text-slate-900' : 'text-slate-600'}`}>Naqd pul orqali</h4>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-400 leading-relaxed">Buyurtma eshigingizga yetib borganda to'laysiz.</p>
                                </div>
                                {paymentMethod === 'cash' && (
                                    <div className="text-primary shrink-0">
                                        <Icon icon="material-symbols:check-circle-rounded" className="w-6 h-6 animate-in zoom-in" />
                                    </div>
                                )}
                            </div>
                            {paymentMethod === 'cash' && <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full pointer-events-none"></div>}
                        </button>

                        {/* Card Method */}
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={`group relative overflow-hidden text-left bg-white border-2 rounded-3xl p-6 transition-all shadow-sm active:scale-[0.98] ${paymentMethod === 'card' ? 'border-primary ring-4 ring-primary/10 shadow-primary/10' : 'border-slate-100 hover:border-slate-300'}`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${paymentMethod === 'card' ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                    <Icon icon="material-symbols:credit-card-outline-rounded" className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-black tracking-tight ${paymentMethod === 'card' ? 'text-slate-900' : 'text-slate-600'}`}>Plastik karta orqali</h4>
                                        <span className="bg-emerald-100 text-emerald-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Fast</span>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-400 leading-relaxed">Humo, Uzcard, Visa, Mastercard qabul qilinadi.</p>
                                </div>
                                {paymentMethod === 'card' && (
                                    <div className="text-primary shrink-0">
                                        <Icon icon="material-symbols:check-circle-rounded" className="w-6 h-6 animate-in zoom-in" />
                                    </div>
                                )}
                            </div>
                            {paymentMethod === 'card' && <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full pointer-events-none"></div>}
                        </button>
                    </div>
                    <p className="text-[11px] font-bold text-center text-slate-400 flex items-center justify-center gap-2 tracking-widest uppercase pt-2">
                        <Icon icon="material-symbols:lock-outline-rounded" className="w-4 h-4" />
                        Barcha to'lovlar xavfsiz himoyalangan
                    </p>
                </section>

            </div>

            {/* Right Column: Summary Card */}
            <div className="lg:col-span-4">
                <div className="sticky top-32 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                    <h3 className="text-xl font-black border-b-2 border-slate-50 pb-5 tracking-tight flex items-center justify-between">
                        Xulosa
                        <Icon icon="material-symbols:receipt-long-outline-rounded" className="text-slate-300 w-6 h-6" />
                    </h3>

                    <div className="space-y-4 font-bold text-[15px]">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Mahsulotlar (3 ta)</span>
                            <span className="text-slate-900 tracking-tight">610 000 so'm</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Yetkazib berish <Icon icon="material-symbols:info-outline-rounded" className="inline w-4 h-4 mb-0.5 text-slate-300" /></span>
                            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">20 000 so'm</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Chegirma promo <Icon icon="material-symbols:local-activity-outline-rounded" className="inline w-4 h-4 mb-0.5 text-slate-300" /></span>
                            <span className="text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">-10 000 so'm</span>
                        </div>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-dashed border-slate-100"></div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Jami to'lov:</span>
                            <span className="text-4xl font-black text-primary leading-none tracking-tighter">620 000 <span className="text-xl font-bold tracking-normal uppercase">so'm</span></span>
                        </div>

                        <button
                            onClick={() => onNext(paymentMethod)}
                            className="w-full bg-primary hover:bg-primary/95 text-white font-black py-4.5 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] group relative overflow-hidden"
                        >
                            <span className="relative z-10">{paymentMethod === 'card' ? "To'lovga o'tish" : "Buyurtma berish"}</span>
                            <Icon icon="material-symbols:arrow-forward-rounded" className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center justify-center gap-2 bg-slate-50 py-3 rounded-xl border border-slate-100">
                            <Icon icon="material-symbols:verified-user-outline-rounded" className="text-emerald-500 w-5 h-5" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-0.5">Xavfsiz xarid</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
