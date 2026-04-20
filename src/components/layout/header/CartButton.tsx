"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/features/cart/useCartStore";

export default function CartButton() {
    const totalItems = useCartStore((s) => s.totalItems());

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-all active:scale-95"
            aria-label={`Cart (${totalItems})`}
        >
            <ShoppingCart className="w-5 h-5 shrink-0" />
            {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 leading-none">
                    {totalItems}
                </span>
            )}
        </Button>
    );
}
