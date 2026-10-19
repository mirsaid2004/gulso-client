"use client";

import { ProductCard } from "./ProductCard";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/features/products/api/get-products";
import { toCardProps } from "@/lib/product-mapper";
import { useTranslations } from "next-intl";

export function ProductGrid() {
    const t = useTranslations("ProductGrid");
    const { data, isLoading } = useProducts();
    const products = data?.data ?? [];

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">{t("title")}</h3>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 aspect-[3/4] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={toCardProps(product)} />
                    ))}
                </div>
            )}

            <div className="mt-10 flex justify-center">
                <Button variant="outline" className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors border-primary/20 h-auto py-2.5 px-6 rounded-lg bg-transparent">
                    {t("showMore")}
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </Button>
            </div>
        </section>
    );
}
