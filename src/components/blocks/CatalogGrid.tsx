"use client";

import { ProductCard } from "./ProductCard";
import { useProducts, ProductsParams } from "@/features/products/api/get-products";
import { toCardProps } from "@/lib/product-mapper";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

interface Props {
    params?: ProductsParams;
}

export function CatalogGrid({ params }: Props = {}) {
    const { data, isLoading } = useProducts({ params });
    const products = data?.data ?? [];

    return (
        <div className="flex-1 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 aspect-[3/4] animate-pulse" />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                    <Icon icon="material-symbols:search-off-rounded" className="w-12 h-12 mb-3" />
                    <p className="font-bold text-sm">No products match your filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={toCardProps(product)} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
                <button className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-400 transition-all active:scale-95 shadow-sm">
                    <Icon icon="material-symbols:chevron-left-rounded" className="w-6 h-6" />
                </button>
                <button className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-primary/20 transition-all" style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}>1</button>
                <button className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-400 transition-all active:scale-95 shadow-sm">
                    <Icon icon="material-symbols:chevron-right-rounded" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}

export function CatalogResultCount({ params }: Props = {}) {
    const t = useTranslations("Catalog");
    const { data } = useProducts({ params });
    const count = data?.meta?.total ?? data?.data?.length ?? 0;
    return (
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Icon icon="material-symbols:search-rounded" className="w-4 h-4 text-slate-400" />
            <span>
                {t.rich("results", {
                    count,
                    bold: (chunks) => <span className="font-black text-slate-800">{chunks}</span>,
                })}
            </span>
        </div>
    );
}
