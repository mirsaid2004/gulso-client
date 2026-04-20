"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export function ReceiptStep({ onHome }: { onHome: () => void }) {
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
                        <h1 className="text-slate-900 tracking-tight text-4xl font-black leading-tight">Buyurtma qabul qilindi!</h1>
                        <p className="text-primary font-black mt-3 bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/10 tracking-wider">Buyurtma raqami: #GS-88421</p>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 mb-6 space-y-8 relative overflow-hidden group">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>

                        <div>
                            <h3 className="text-xl font-black mb-6 border-b-2 border-slate-50 pb-4 flex items-center gap-3">
                                <Icon icon="material-symbols:receipt-long-outline-rounded" className="text-primary" />
                                To'lov tafsilotlari
                            </h3>
                            <div className="space-y-4 font-bold text-[15px]">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Mahsulotlar narxi</span>
                                    <span className="text-slate-900 tracking-tight">450,000 so'm</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Yetkazib berish</span>
                                    <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">25,000 so'm</span>
                                </div>
                                <div className="flex justify-between items-center pt-5 border-t-2 border-dashed border-slate-100 mt-2">
                                    <span className="text-lg font-black text-slate-400 uppercase tracking-widest">Jami summa</span>
                                    <span className="text-3xl font-black text-primary tracking-tighter">475,000 <span className="text-sm">so'm</span></span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-black mb-6 border-b-2 border-slate-50 pb-4 flex items-center gap-3 mt-8">
                                <Icon icon="material-symbols:local-shipping-outline-rounded" className="text-primary" />
                                Yetkazib berish ma'lumotlari
                            </h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Icon icon="material-symbols:location-on-outline-rounded" className="w-5 h-5" />
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">Manzil</p>
                                        <p className="font-bold text-slate-900 leading-relaxed text-[15px]">Toshkent sh., Mirzo Ulug'bek tumani, Mustaqillik shoh ko'chasi, 12-uy</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Icon icon="material-symbols:schedule-outline-rounded" className="w-5 h-5" />
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">Vaqt</p>
                                        <p className="font-bold text-slate-900 text-[15px]">Bugun, 18:00 - 20:00 oralig'ida</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Icon icon="material-symbols:payments-outline-rounded" className="w-5 h-5" />
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">To'lov usuli</p>
                                        <p className="font-bold text-slate-900 text-[15px]">Naqd pul bilan (Qabul qilganda)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        <button className="flex w-full items-center justify-center gap-2 rounded-2xl h-14 bg-primary text-white font-black transition-all active:scale-[0.98] shadow-lg shadow-primary/20 hover:bg-primary/95 text-base">
                            <Icon icon="material-symbols:download-rounded" className="w-6 h-6" />
                            Chekni yuklab olish
                        </button>
                        <button onClick={onHome} className="flex w-full items-center justify-center gap-2 rounded-2xl h-14 bg-white border-2 border-primary/10 text-primary font-black hover:bg-primary/5 transition-colors active:scale-[0.98] text-base">
                            <Icon icon="material-symbols:home-outline-rounded" className="w-6 h-6" />
                            Asosiy sahifaga qaytish
                        </button>
                    </div>

                    <div className="mt-12 bg-white rounded-3xl p-2 border border-slate-100 shadow-sm">
                        <div className="w-full h-48 rounded-[1.5rem] overflow-hidden grayscale opacity-80 group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center relative">
                                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKHM_QCt-LVUgOEx2QGnsufsWXGrQmqrAWngolvkndag2rxHU6xU_Bpkfl0ww4yAhcIz2gsurUFxBd41ztQuxQTDPuAEpKgquf_t0bdyWFWxV9qOnP-1HOv13SKe-U2c1Q8sL-HAnd_-AjOCcM3Z5LTJ4m2iUEe4MArJRnBa9QwAd4QMMZsG753vD3Qvo0FvGtM2HKwJ2j2EjDzjvtak3jYSwomFF9P6klsKMldgBP735KdNOeRRYDFMiHoFVCu72NbmfMCjCZxY8V" alt="Delivery Location" fill className="object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
                                        <Icon icon="material-symbols:location-on-rounded" className="text-primary text-5xl drop-shadow-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-xs font-bold text-slate-400 mt-6 bg-slate-100 py-3 px-6 rounded-full inline-flex self-center gap-2 items-center">
                        <Icon icon="material-symbols:info-outline-rounded" className="w-4 h-4" />
                        Kuryerimiz buyurtmani tayyorlagach siz bilan bog'lanadi.
                    </p>
                </div>
            </main>

            <footer className="py-6 sm:py-8 text-center text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                © 2024 Gulso 1.0. Barcha huquqlar himoyalangan.
            </footer>
        </div>
    );
}
