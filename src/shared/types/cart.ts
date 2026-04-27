export type CartItem = {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
}

export type CartState = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
}
