import type { Product } from './product.ts'

export type CartItem = Product & {
  quantity: number
}

export type CartState = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
}
