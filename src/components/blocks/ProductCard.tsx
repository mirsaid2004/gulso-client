"use client";

import { Icon } from "@iconify/react";
import { Image } from "@/components/ui/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";
import { useCartStore } from "@/features/cart/useCartStore";

interface ProductCardProps {
    product: {
        id: number;
        store: string;
        companyId?: number;
        title: string;
        price: number;
        originalPrice?: number;
        image: string;
        rating?: number;
        reviewCount?: number;
        isNew?: boolean;
        isTopSeller?: boolean;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations("Product");
    const { toggleItem, hasItem } = useWishlistStore();
    const wishlisted = hasItem(String(product.id));
    const { addItem, removeItem, incrementItem, decrementItem, items } = useCartStore();
    const cartItem = items.find((i) => i.id === String(product.id));
    const quantity = cartItem?.quantity ?? 0;

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    const rating = product.rating ?? 4.5;
    const reviewCount = product.reviewCount ?? 24;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-slate-50">
                <Link href={`/product/${product.id}`} className="block w-full aspect-square">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                </Link>

                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md shadow-primary/30 leading-none tracking-wide z-10">
                        -{discount}%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={() => toggleItem({ id: String(product.id), title: product.title, image: product.image, price: product.price })}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm transition-all z-10 active:scale-90 ${wishlisted
                        ? "bg-rose-500 text-white shadow-rose-200"
                        : "bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white"
                        }`}
                >
                    <Icon
                        icon={wishlisted ? "material-symbols:favorite-rounded" : "material-symbols:favorite-outline-rounded"}
                        className="w-[18px] h-[18px]"
                    />
                </button>

                {/* Bottom-left status badges */}
                {(product.isNew || product.isTopSeller) && (
                    <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                        {product.isNew && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-lg shadow-md leading-none tracking-wide">
                                <Icon icon="material-symbols:fiber-new-rounded" className="w-3.5 h-3.5 shrink-0" />
                                {t("badgeNew")}
                            </span>
                        )}
                        {product.isTopSeller && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-amber-400 text-white text-[10px] font-black rounded-lg shadow-md leading-none tracking-wide">
                                <Icon icon="material-symbols:trending-up-rounded" className="w-3.5 h-3.5 shrink-0" />
                                {t("badgeTop")}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                {/* Store */}
                <div className="flex items-center gap-1.5 mb-2">
                    <Icon icon="material-symbols:storefront-outline-rounded" className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                    {product.companyId ? (
                        <Link href={`/shop/${product.companyId}`} className="text-[11px] font-bold text-primary line-clamp-1 leading-none hover:underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
                            {product.store}
                        </Link>
                    ) : (
                        <p className="text-[11px] font-bold text-primary line-clamp-1 leading-none">{product.store}</p>
                    )}
                </div>

                {/* Title */}
                <Link href={`/product/${product.id}`}>
                    <h4 className="font-bold text-[14px] sm:text-[15px] text-slate-800 leading-snug mb-2.5 line-clamp-2 hover:text-primary transition-colors">
                        {product.title}
                    </h4>
                </Link>

                {/* Star Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Icon
                                key={i}
                                icon={
                                    i < fullStars
                                        ? "material-symbols:star-rounded"
                                        : i === fullStars && hasHalfStar
                                            ? "material-symbols:star-half-rounded"
                                            : "material-symbols:star-outline-rounded"
                                }
                                className="w-3.5 h-3.5"
                            />
                        ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">({reviewCount})</span>
                </div>

                {/* Price */}
                <div className="mt-auto mb-3 flex flex-col">
                    {product.originalPrice && (
                        <span className="text-slate-400 text-[12px] line-through font-medium leading-none mb-1">
                            {product.originalPrice.toLocaleString()} {t("currency")}
                        </span>
                    )}
                    <span className="text-[22px] sm:text-[24px] font-black text-primary leading-none tracking-tight">
                        {product.price.toLocaleString()}
                        <span className="text-[13px] font-bold ml-1">{t("currency")}</span>
                    </span>
                </div>

                {/* Add to Cart / Counter */}
                <div className="flex items-center gap-1.5 h-[44px] w-full">
                    {/* Cart button — full width initially, shrinks to icon when counter appears */}
                    <button
                        onClick={() => {
                            if (quantity === 0) {
                                addItem({ id: String(product.id), productId: product.id, title: product.title, store: product.store, image: product.image, price: product.price, originalPrice: product.originalPrice });
                            } else {
                                removeItem(String(product.id));
                            }
                        }}
                        style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                        className={`h-[44px] rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20 transition-all duration-300 active:scale-95 shrink-0 overflow-hidden ${quantity > 0
                            ? "w-[44px]"
                            : "w-full gap-2 font-bold text-[13px] sm:text-[14px]"
                            }`}
                    >
                        <Icon icon={quantity > 0 ? "material-symbols:close-rounded" : "material-symbols:shopping-cart-rounded"} className="w-[18px] h-[18px] shrink-0" />
                        <span className={`whitespace-nowrap transition-all duration-300 ${quantity > 0 ? "w-0 opacity-0" : "opacity-100"}`}>
                            {t('addToCart')}
                        </span>
                    </button>

                    {/* Counter — takes remaining width, − and + share space equally */}
                    {quantity > 0 && (
                        <div className="flex-1 flex items-center justify-end gap-1 animate-in fade-in slide-in-from-right-3 duration-200 min-w-0">
                            <button
                                onClick={() => decrementItem(String(product.id))}
                                style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                                className="flex-1 h-[44px] min-w-0 max-w-12 rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20 transition-all active:scale-95"
                            >
                                <Icon icon="material-symbols:remove-rounded" className="w-[18px] h-[18px] shrink-0" />
                            </button>
                            <span className="text-[16px] font-black text-primary text-center tabular-nums px-1 min-w-[20px]">
                                {quantity}
                            </span>
                            <button
                                onClick={() => incrementItem(String(product.id))}
                                style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                                className="flex-1 h-[44px] min-w-0 max-w-12 rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20 transition-all active:scale-95"
                            >
                                <Icon icon="material-symbols:add-rounded" className="w-[18px] h-[18px] shrink-0" />
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
