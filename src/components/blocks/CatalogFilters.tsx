"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

export function CatalogFilters() {
    const [priceSort, setPriceSort] = useState<"cheap" | "expensive">("cheap");
    const [popularity, setPopularity] = useState<string[]>(["bestseller"]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState<number | null>(null);

    const togglePopularity = (val: string) => {
        setPopularity((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
        );
    };

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-[100px] flex flex-col gap-4">

                {/* Sort by Price */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        Narx bo'yicha
                    </h3>
                    <div className="flex flex-col gap-1.5">
                        {[
                            { val: "cheap" as const, icon: "material-symbols:trending-down-rounded", label: "Arzonroq" },
                            { val: "expensive" as const, icon: "material-symbols:trending-up-rounded", label: "Qimmatroq" },
                        ].map(({ val, icon, label }) => (
                            <label
                                key={val}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-l-2 ${priceSort === val
                                        ? "bg-primary/5 border-l-primary text-primary"
                                        : "bg-transparent border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-primary"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="sort"
                                    className="hidden"
                                    checked={priceSort === val}
                                    onChange={() => setPriceSort(val)}
                                />
                                <Icon icon={icon} className="text-xl shrink-0" />
                                <span className="text-sm font-bold">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        Narx oralig'i
                    </h3>
                    <div className="flex gap-2 items-center">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 placeholder:text-slate-300"
                        />
                        <span className="text-slate-300 font-bold text-lg shrink-0">—</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 placeholder:text-slate-300"
                        />
                    </div>
                    <p className="mt-2 text-[10px] font-bold text-slate-400 text-right tracking-wide">so'm</p>
                </div>

                {/* Filters */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        Ommabopligi
                    </h3>
                    <div className="flex flex-col gap-1.5">
                        {[
                            { val: "bestseller", label: "Eng ko'p sotilgan" },
                            { val: "new", label: "Yangi kelganlar" },
                            { val: "discount", label: "Chegirmalar" },
                        ].map(({ val, label }) => (
                            <label
                                key={val}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-l-2 ${popularity.includes(val)
                                        ? "bg-primary/5 border-l-primary text-primary"
                                        : "border-l-transparent text-slate-600 hover:bg-slate-50"
                                    }`}
                                onClick={() => togglePopularity(val)}
                            >
                                <div
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${popularity.includes(val)
                                            ? "border-primary bg-primary"
                                            : "border-slate-300"
                                        }`}
                                >
                                    {popularity.includes(val) && (
                                        <Icon icon="material-symbols:check-rounded" className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className="text-sm font-bold">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Minimum Rating */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        Reyting
                    </h3>
                    <div className="flex flex-col gap-1.5">
                        {[4, 3, 2].map((stars) => (
                            <label
                                key={stars}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-l-2 ${minRating === stars
                                        ? "bg-primary/5 border-l-primary"
                                        : "border-l-transparent hover:bg-slate-50"
                                    }`}
                                onClick={() => setMinRating(minRating === stars ? null : stars)}
                            >
                                <div className="flex items-center gap-0.5 text-amber-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Icon
                                            key={i}
                                            icon={i < stars ? "material-symbols:star-rounded" : "material-symbols:star-outline-rounded"}
                                            className="w-4 h-4"
                                        />
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-slate-600">va yuqori</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Apply Button */}
                <button
                    style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                    className="w-full h-12 text-white rounded-xl font-black text-sm shadow-md shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all"
                >
                    Filtrni qo'llash
                </button>

                {/* Reset */}
                <button className="w-full h-10 text-slate-400 text-xs font-bold hover:text-primary transition-colors">
                    Filtrlarni tozalash
                </button>
            </div>
        </aside>
    );
}
