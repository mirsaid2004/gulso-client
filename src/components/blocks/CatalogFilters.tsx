"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { ProductCategory } from "@/types";

export interface CatalogFilterState {
    category: ProductCategory | undefined;
    minPrice: string;
    maxPrice: string;
    isNew: boolean;
    isInStock: boolean;
    hasDiscount: boolean;
    sortBy: string;
    sortDir: "asc" | "desc";
}

export const DEFAULT_FILTERS: CatalogFilterState = {
    category: undefined,
    minPrice: "",
    maxPrice: "",
    isNew: false,
    isInStock: false,
    hasDiscount: false,
    sortBy: "id",
    sortDir: "desc",
};

interface Props {
    value: CatalogFilterState;
    onChange: (v: CatalogFilterState) => void;
    onApply: () => void;
    onReset: () => void;
}

const SORT_OPTIONS = (t: ReturnType<typeof useTranslations>) => [
    { sortBy: "id",     sortDir: "desc" as const, label: t("sort.newest") },
    { sortBy: "price",  sortDir: "asc"  as const, label: t("sort.cheapest") },
    { sortBy: "price",  sortDir: "desc" as const, label: t("sort.expensive") },
    { sortBy: "rating", sortDir: "desc" as const, label: t("sort.topRated") },
];

const CATEGORIES = (t: ReturnType<typeof useTranslations>) => [
    { value: undefined,                label: t("category.all") },
    { value: ProductCategory.FLOWERS,  label: t("category.flowers") },
    { value: ProductCategory.GIFTS,    label: t("category.gifts") },
    { value: ProductCategory.BAKERY,   label: t("category.bakery") },
];

export function CatalogFilters({ value, onChange, onApply, onReset }: Props) {
    const t = useTranslations("Catalog.filters");

    const set = (patch: Partial<CatalogFilterState>) => onChange({ ...value, ...patch });

    const activeSort = SORT_OPTIONS(t).findIndex(
        (o) => o.sortBy === value.sortBy && o.sortDir === value.sortDir
    );

    const toggleFlag = (key: "isNew" | "isInStock" | "hasDiscount") =>
        set({ [key]: !value[key] });

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-[100px] flex flex-col gap-4">

                {/* Category */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        {t("category.title")}
                    </h3>
                    <div className="flex flex-col gap-1">
                        {CATEGORIES(t).map(({ value: cat, label }) => {
                            const active = value.category === cat;
                            return (
                                <button
                                    key={String(cat)}
                                    onClick={() => set({ category: cat })}
                                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left border-l-2 ${
                                        active
                                            ? "bg-primary/5 border-l-primary text-primary"
                                            : "border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-primary"
                                    }`}
                                >
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                                            active ? "border-primary bg-primary" : "border-slate-300"
                                        }`}
                                    />
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sort */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        {t("sort.title")}
                    </h3>
                    <div className="flex flex-col gap-1">
                        {SORT_OPTIONS(t).map((opt, idx) => (
                            <label
                                key={idx}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-l-2 ${
                                    activeSort === idx
                                        ? "bg-primary/5 border-l-primary text-primary"
                                        : "border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-primary"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="sort"
                                    className="hidden"
                                    checked={activeSort === idx}
                                    onChange={() => set({ sortBy: opt.sortBy, sortDir: opt.sortDir })}
                                />
                                <span className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                                    activeSort === idx ? "border-primary bg-primary" : "border-slate-300"
                                }`} />
                                <span className="text-sm font-bold">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        {t("price.range")}
                    </h3>
                    <div className="flex gap-2 items-center">
                        <input
                            type="number"
                            placeholder={t("price.min")}
                            value={value.minPrice}
                            onChange={(e) => set({ minPrice: e.target.value })}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 placeholder:text-slate-300"
                        />
                        <span className="text-slate-300 font-bold text-lg shrink-0">—</span>
                        <input
                            type="number"
                            placeholder={t("price.max")}
                            value={value.maxPrice}
                            onChange={(e) => set({ maxPrice: e.target.value })}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 placeholder:text-slate-300"
                        />
                    </div>
                    <p className="mt-2 text-[10px] font-bold text-slate-400 text-right tracking-wide">
                        {t("price.currency")}
                    </p>
                </div>

                {/* Flags */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        {t("popularity.title")}
                    </h3>
                    <div className="flex flex-col gap-1.5">
                        {([
                            { key: "isNew",       label: t("popularity.new") },
                            { key: "isInStock",   label: t("popularity.inStock") },
                            { key: "hasDiscount", label: t("popularity.discount") },
                        ] as const).map(({ key, label }) => (
                            <label
                                key={key}
                                onClick={() => toggleFlag(key)}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-l-2 ${
                                    value[key]
                                        ? "bg-primary/5 border-l-primary text-primary"
                                        : "border-l-transparent text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                                    value[key] ? "border-primary bg-primary" : "border-slate-300"
                                }`}>
                                    {value[key] && (
                                        <Icon icon="material-symbols:check-rounded" className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className="text-sm font-bold">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Apply */}
                <button
                    onClick={onApply}
                    style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                    className="w-full h-12 text-white rounded-xl font-black text-sm shadow-md shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all"
                >
                    {t("apply")}
                </button>

                {/* Reset */}
                <button
                    onClick={onReset}
                    className="w-full h-10 text-slate-400 text-xs font-bold hover:text-primary transition-colors"
                >
                    {t("reset")}
                </button>
            </div>
        </aside>
    );
}
