import { create } from 'zustand'
import type { Product } from '../types/product.ts'

type CartItem = {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }]
      }
    }),
  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    })),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id)
    })),

  clearCart: () => set({ items: [] })
}))
