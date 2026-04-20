import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            existing.quantity += 1;
          } else {
            state.items.push({ ...item, quantity: 1 });
          }
        }),

      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((i) => i.id !== id);
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            if (quantity <= 0) {
              state.items = state.items.filter((i) => i.id !== id);
            } else {
              item.quantity = quantity;
            }
          }
        }),

      incrementItem: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) item.quantity += 1;
        }),

      decrementItem: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            if (item.quantity <= 1) {
              state.items = state.items.filter((i) => i.id !== id);
            } else {
              item.quantity -= 1;
            }
          }
        }),

      clear: () =>
        set((state) => {
          state.items = [];
        }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    })),
    {
      name: "gulso-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
