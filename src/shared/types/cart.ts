import type { Product } from './product.ts'

export type CartItem = Product & {
  quantity: number
}

export type CartState = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
}
