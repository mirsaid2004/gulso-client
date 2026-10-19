"use client";

import { useEffect } from "react";
import { useCartStore } from "@/features/cart/useCartStore";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";

export function StoreHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);
  return null;
}
