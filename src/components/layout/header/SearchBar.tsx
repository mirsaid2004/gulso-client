"use client";

import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useProducts } from "@/features/products/api/get-products";
import { toCardProps } from "@/lib/product-mapper";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();
    const t = useTranslations('Layout.header.search');
    const tCart = useTranslations('Checkout.cart');

    const { data } = useProducts();
    const allProducts = (data?.data ?? []).map(toCardProps);

    const filtered = query.trim()
        ? allProducts.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
        )
        : allProducts;

    const handleFocus = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const handleBlur = () => {
        closeTimer.current = setTimeout(() => setOpen(false), 150);
    };

    const handleSelect = useCallback(
        (id: number) => {
            setOpen(false);
            setQuery("");
            router.push(`/product/${id}`);
        },
        [router]
    );

    const handleViewAll = () => {
        setOpen(false);
        router.push(query.trim() ? `/catalog?q=${encodeURIComponent(query)}` : "/catalog");
    };

    return (
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
            <div className="relative w-full group">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors z-10 pointer-events-none" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={t('placeholder')}
                    className="w-full pl-12 pr-16 py-5 bg-slate-100 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 text-sm"
                />

                {/* ⌘K badge */}
                {!query && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                        <kbd className="inline-flex h-6 select-none items-center gap-1 rounded-md border border-slate-200 bg-white px-2 font-mono text-[10px] font-bold text-slate-400 shadow-sm transition-colors group-focus-within:border-primary/30 group-focus-within:text-primary/70">
                            <span className="text-[10px] leading-none">⌘</span>K
                        </kbd>
                    </div>
                )}

                {/* Dropdown */}
                {open && (
                    <div
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-primary/10 z-50 overflow-hidden"
                        style={{ animation: "hover-card-enter 0.3s cubic-bezier(0.2, 1, 0.3, 1) forwards" }}
                    >
                        {/* Results header */}
                        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                {query.trim() ? t('resultsFor', { query }) : t('popular')}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {t('counts', { count: filtered.length })}
                            </span>
                        </div>

                        {/* Product list */}
                        {filtered.length > 0 ? (
                            <ul className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                                {filtered.map((prod) => (
                                    <li key={prod.id}>
                                        <button
                                            onMouseDown={() => handleSelect(prod.id)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 transition-colors text-left"
                                        >
                                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                                <Image
                                                    src={prod.image}
                                                    alt={prod.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm text-slate-800 truncate">
                                                    {prod.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {prod.store}
                                                </p>
                                            </div>
                                            <span className="text-sm font-bold text-primary shrink-0">
                                                {prod.price.toLocaleString()} {tCart('summary.currency')}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                                {t('noResults')}
                            </p>
                        )}

                        {/* Footer: view all */}
                        <div className="border-t border-slate-100">
                            <button
                                onMouseDown={handleViewAll}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-primary hover:bg-primary/5 transition-colors"
                            >
                                {t('viewAll')} <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
