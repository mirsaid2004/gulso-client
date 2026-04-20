"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";

export default function WishlistButton() {
    const count = useWishlistStore((s) => s.items.length);

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-all active:scale-95 hidden sm:flex"
            aria-label={`Wishlist (${count})`}
        >
            <Heart className="w-5 h-5 shrink-0" />
            {count > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 leading-none">
                    {count}
                </span>
            )}
        </Button>
    );
}
