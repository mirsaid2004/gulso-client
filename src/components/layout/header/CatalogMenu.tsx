"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Menu, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { categories } from "@/data/mockData";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/blocks/ProductCard";
import { useProducts } from "@/features/products/api/get-products";
import { toCardProps } from "@/lib/product-mapper";
import { ProductCategory } from "@/types";

const CATEGORY_TO_ENUM: Record<string, ProductCategory> = {
    "gullar":       ProductCategory.FLOWERS,
    "sovg'alar":    ProductCategory.GIFTS,
    "pishiriqlar":  ProductCategory.BAKERY,
};

export default function CatalogMenu() {
    const t = useTranslations('Layout.header.catalog');
    const [activeId, setActiveId] = useState(categories[0].id);

    const { data, isFetching } = useProducts({
        params: { category: CATEGORY_TO_ENUM[activeId], size: 3 },
    });

    const featured = data?.data ?? [];

    return (
        <HoverCard>
            <HoverCardTrigger
                className={cn(
                    buttonVariants({ variant: "default" }),
                    "hidden lg:flex items-center gap-2 font-bold px-5 text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 rounded-xl cursor-pointer"
                )}
            >
                <Menu className="w-4 h-4" />
                {t('title')}
            </HoverCardTrigger>

            <HoverCardContent
                align="start"
                sideOffset={12}
                className="w-[960px] p-0 rounded-2xl border-primary/10 shadow-xl flex overflow-hidden"
            >
                {/* Left sidebar — narrower */}
                <div className="w-44 shrink-0 bg-slate-50 py-4 border-r border-slate-100 flex flex-col gap-0.5">
                    <h3 className="font-bold text-slate-900 mb-2 px-4 text-sm">{t('categories')}</h3>
                    {categories.map((cat) => {
                        const isActive = cat.id === activeId;
                        return (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.id}`}
                                onMouseEnter={() => setActiveId(cat.id)}
                                className={cn(
                                    "flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-all",
                                    isActive
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-slate-600 hover:bg-white/60 hover:text-primary"
                                )}
                            >
                                {cat.title}
                                {isActive && <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side — 3-col product grid */}
                <div className="flex-1 p-5 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900">
                            {categories.find((c) => c.id === activeId)?.title ?? t('popular')}
                        </h3>
                        <Link
                            href={`/catalog?category=${CATEGORY_TO_ENUM[activeId]}`}
                            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                        >
                            {t('viewAll')} <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {isFetching
                            ? Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-slate-100 rounded-2xl aspect-[3/4] animate-pulse" />
                            ))
                            : featured.map((p) => (
                                <ProductCard key={p.id} product={toCardProps(p)} />
                            ))
                        }
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
