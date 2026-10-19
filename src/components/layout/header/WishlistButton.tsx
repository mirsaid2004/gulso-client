"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function WishlistButton() {
    const count = useWishlistStore((s) => s.items.length);
    const t = useTranslations('Layout.header');
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/profile?tab=favorites')}
            className="relative text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-all active:scale-95 hidden sm:flex"
            aria-label={t('wishlist', { count })}
        >
            <Heart className="w-5 h-5 shrink-0" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 leading-none">
                    {count}
                </span>
            )}
        </Button>
    );
}
