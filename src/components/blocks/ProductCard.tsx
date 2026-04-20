"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState } from "react";

interface ProductCardProps {
    product: {
        id: number;
        store: string;
        title: string;
        price: number;
        originalPrice?: number;
        image: string;
        rating?: number;
        reviewCount?: number;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const [wishlisted, setWishlisted] = useState(false);

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
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                <Link href={`/product/${product.id}`} className="block w-full h-full">
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
                    onClick={() => setWishlisted((v) => !v)}
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
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                {/* Store */}
                <div className="flex items-center gap-1.5 mb-2">
                    <Icon icon="material-symbols:storefront-outline-rounded" className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                    <p className="text-[11px] font-bold text-primary line-clamp-1 leading-none">{product.store}</p>
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
                            {product.originalPrice.toLocaleString()} so'm
                        </span>
                    )}
                    <span className="text-[22px] sm:text-[24px] font-black text-primary leading-none tracking-tight">
                        {product.price.toLocaleString()}
                        <span className="text-[13px] font-bold ml-1">so'm</span>
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="w-full text-white h-[44px] rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] sm:text-[14px] transition-all active:scale-[0.97] shadow-md shadow-primary/20"
                    style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                >
                    <Icon icon="material-symbols:shopping-cart-rounded" className="w-[18px] h-[18px] shrink-0" />
                    Savatga qo'shish
                </button>
            </div>
        </div>
    );
}
