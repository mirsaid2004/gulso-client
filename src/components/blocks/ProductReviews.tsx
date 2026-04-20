"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

export function ProductReviews() {
    return (
        <div className="mt-16 sm:mt-24 max-w-4xl">
            <div className="flex items-center justify-between sm:justify-start gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">48 ta sharh</h2>
                <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm active:scale-95">
                    <Icon icon="material-symbols:sort-rounded" className="text-xl" />
                    Saralash
                </button>
            </div>

            {/* Add Comment Input */}
            <div className="flex gap-4 mb-12 group items-start bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="bg-primary/10 rounded-full w-12 h-12 overflow-hidden shrink-0 border border-primary/20 shadow-inner flex items-center justify-center">
                    {/* Fallback anonymous avatar structure since we dont have user contexts */}
                    <Icon icon="material-symbols:person-rounded" className="text-primary w-6 h-6" />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                    <input
                        className="w-full bg-transparent border-0 border-b-2 border-slate-100 focus:ring-0 focus:border-primary px-0 py-2 text-base placeholder:text-slate-400 transition-colors font-medium text-slate-900"
                        placeholder="Kengaytirilgan Youtubedek fikr qoldiring..."
                        type="text"
                    />
                    <div className="flex justify-end gap-3 opacity-0 group-focus-within:opacity-100 transition-all transform translate-y-2 group-focus-within:translate-y-0 duration-300 pointer-events-none group-focus-within:pointer-events-auto">
                        <button className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-full transition-colors active:scale-95">Bekor qilish</button>
                        <button className="px-5 py-2.5 text-sm font-bold bg-primary text-white hover:bg-primary/90 rounded-full transition-colors active:scale-95 shadow-md shadow-primary/20">Sharh qoldirish</button>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="flex flex-col gap-8">
                {/* Review 1 */}
                <div className="flex gap-4 sm:gap-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black shrink-0 text-lg shadow-inner">
                        AZ
                    </div>
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="font-extrabold text-[15px] text-slate-900">@aziza_karimova</span>
                            <span className="text-xs font-semibold text-slate-400">2 kun avval</span>
                        </div>
                        <p className="text-[15px] text-slate-700 leading-relaxed font-medium">
                            Guldasta juda chiroyli ekan, atirgullar yangi va hidlari ham ajoyib. Yetkazib berish xizmati ham juda tez ishladi. Tavsiya qilaman! 🌷✨
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
                            <div className="flex items-center gap-1.5 hover:bg-primary/5 rounded-full p-1 pr-3 transition-colors">
                                <button className="flex items-center justify-center text-slate-400 hover:text-primary p-2 rounded-full transition-colors active:scale-95">
                                    <Icon icon="material-symbols:thumb-up-outline-rounded" className="text-[20px]" />
                                </button>
                                <span className="text-xs font-black text-slate-600">12</span>
                            </div>
                            <div className="flex items-center gap-1.5 hover:bg-rose-50 rounded-full p-1 transition-colors">
                                <button className="flex items-center justify-center hover:text-rose-500 text-slate-400 p-2 rounded-full transition-colors active:scale-95">
                                    <Icon icon="material-symbols:thumb-down-outline-rounded" className="text-[20px]" />
                                </button>
                            </div>
                            <button className="text-xs font-bold px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full transition-colors ml-auto sm:ml-2">Javob qaytarish</button>
                        </div>
                    </div>
                </div>

                {/* Review 2 */}
                <div className="flex gap-4 sm:gap-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-black shrink-0 text-lg shadow-inner">
                        JS
                    </div>
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="font-extrabold text-[15px] text-slate-900">@jasur_sobirov</span>
                            <span className="text-xs font-semibold text-slate-400">1 hafta avval</span>
                        </div>
                        <p className="text-[15px] text-slate-700 leading-relaxed font-medium">
                            Onajonimga sovg'a qilgandim, juda xursand bo'ldilar. Sifatiga gap yo'q. O'rami ham juda did bilan qilingan. Rahmat kattakon Gulso jamoasiga!
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
                            <div className="flex items-center gap-1.5 hover:bg-primary/5 rounded-full p-1 pr-3 transition-colors">
                                <button className="flex items-center justify-center text-slate-400 hover:text-primary p-2 rounded-full transition-colors active:scale-95">
                                    <Icon icon="material-symbols:thumb-up-outline-rounded" className="text-[20px]" />
                                </button>
                                <span className="text-xs font-black text-slate-600">4</span>
                            </div>
                            <div className="flex items-center gap-1.5 hover:bg-rose-50 rounded-full p-1 transition-colors">
                                <button className="flex items-center justify-center hover:text-rose-500 text-slate-400 p-2 rounded-full transition-colors active:scale-95">
                                    <Icon icon="material-symbols:thumb-down-outline-rounded" className="text-[20px]" />
                                </button>
                            </div>
                            <button className="text-xs font-bold px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full transition-colors ml-auto sm:ml-2">Javob qaytarish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
