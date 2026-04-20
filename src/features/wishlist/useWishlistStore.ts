import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface WishlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  hasItem: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          if (!state.items.find((i) => i.id === item.id)) {
            state.items.push(item);
          }
        }),

      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((i) => i.id !== id);
        }),

      toggleItem: (item) => {
        if (get().hasItem(item.id)) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },

      hasItem: (id) => get().items.some((i) => i.id === id),

      clear: () =>
        set((state) => {
          state.items = [];
        }),
    })),
    {
      name: "gulso-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
