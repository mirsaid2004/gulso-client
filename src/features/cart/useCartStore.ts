import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface CartItem {
  id: string;
  productId: number;
  title: string;
  store: string;
  image: string;
  price: number;          // actual selling price (after discount)
  originalPrice?: number; // before discount, for display
  quantity: number;
  delivery: boolean;      // whether this item requires delivery
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "delivery">) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleDelivery: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  totalDiscount: () => number;
  needsDelivery: () => boolean;
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
            state.items.push({ ...item, quantity: 1, delivery: true });
          }
        }),

      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((i) => i.id !== id);
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

      toggleDelivery: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) item.delivery = !item.delivery;
        }),

      clear: () =>
        set((state) => {
          state.items = [];
        }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      totalDiscount: () =>
        get().items.reduce((sum, i) => {
          if (!i.originalPrice) return sum;
          return sum + (i.originalPrice - i.price) * i.quantity;
        }, 0),

      needsDelivery: () => get().items.some((i) => i.delivery),
    })),
    {
      name: "gulso-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
