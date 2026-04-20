"use client";

import { Icon } from "@iconify/react";

export function PaymentStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form */}
            <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">

                {/* Progress Indicator */}
                <div className="flex items-center justify-between max-w-sm mb-4">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border-2 border-primary">
                            <Icon icon="material-symbols:check-rounded" className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-primary">Savat</span>
                    </div>
                    <div className="h-0.5 flex-1 bg-primary mx-4"></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black shadow-md shadow-primary/20">2</div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-primary">To'lov</span>
                    </div>
                    <div className="h-0.5 flex-1 bg-slate-100 mx-4"></div>
                    <div className="flex flex-col items-center gap-2 opacity-50 grayscale">
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black">3</div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Yakun</span>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Icon icon="material-symbols:credit-card-outline-rounded" className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-slate-900">Karta ma'lumotlari</h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">To'lov xavfsiz portal orqali yechiladi</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>

                        {/* Card Number */}
                        <div className="space-y-2 relative">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Karta raqami</label>
                            <div className="relative">
                                <input
                                    className="w-full h-16 pl-5 pr-24 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-black text-slate-800 text-lg sm:text-2xl tracking-[0.2em] placeholder:text-slate-300"
                                    placeholder="0000 0000 0000 0000"
                                    type="text"
                                    maxLength={19}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <div className="bg-blue-600 w-10 h-6 rounded flex items-center justify-center font-black text-[9px] text-white italic tracking-tighter shadow-sm">VISA</div>
                                </div>
                            </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Karta egasining ismi</label>
                            <input
                                className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-black text-slate-800 uppercase placeholder:text-slate-300 tracking-wider placeholder:tracking-normal"
                                placeholder="Lotin alifbosida kiriting"
                                type="text"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Expiry Date */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Amal qilish muddati</label>
                                <input
                                    className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-black text-slate-800 text-center text-xl tracking-[0.2em] placeholder:text-slate-300 placeholder:tracking-normal"
                                    placeholder="OO / YY"
                                    type="text"
                                    maxLength={5}
                                />
                            </div>

                            {/* CVV */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center justify-between w-full">
                                    CVV / CVC
                                    <Icon icon="material-symbols:help-outline-rounded" className="w-4 h-4 cursor-help" />
                                </label>
                                <input
                                    className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/40 focus:ring-0 outline-none transition-all font-black text-slate-800 text-center text-xl tracking-[0.5em] placeholder:text-slate-300 placeholder:tracking-normal"
                                    maxLength={3}
                                    placeholder="***"
                                    type="password"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/95 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Icon icon="material-symbols:lock-rounded" className="w-6 h-6" />
                                To'lovni amalga oshirish: 620,000 so'm
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

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-150 fill-mode-both">
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

                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Jami yechiladigan summa:</span>
                        <span className="text-4xl font-black text-primary leading-none tracking-tighter">620 000 <span className="text-xl font-bold tracking-normal uppercase">so'm</span></span>
                    </div>

                    <div className="mt-6 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                        <div className="flex gap-4">
                            <div className="bg-primary/10 w-12 h-12 rounded-xl text-primary flex items-center justify-center shrink-0">
                                <Icon icon="material-symbols:support-agent-rounded" className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-800 tracking-tight">Yordam kerakmi?</p>
                                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">To'lov bilan bog'liq muammo bo'lsa bizga aloqaga chiqing.</p>
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
