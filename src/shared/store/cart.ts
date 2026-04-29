import { create } from 'zustand'
import type { CartItem, CartState } from '../types/cart.ts'

const STORAGE_KEY = 'cart'

const loadCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveCart = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCart(),

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)

      const currentQty = existing?.quantity || 0
      const maxStock = product.stock ?? Infinity

      if (currentQty >= maxStock) {
        return state
      }

      const updated = existing
        ? state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...product, quantity: 1 }]

      saveCart(updated)
      return { items: updated }
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const updated = state.items
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)

      saveCart(updated)
      return { items: updated }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updated = state.items.filter((i) => i.id !== id)
      saveCart(updated)
      return { items: updated }
    }),

  clearCart: () =>
    set(() => {
      saveCart([])
      return { items: [] }
    }),

  isInCart: (id) => get().items.some((i) => i.id === id)
}))
