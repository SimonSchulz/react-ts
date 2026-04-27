import { useCartStore } from '../store/cart'
import type { CartItem as CartItemType } from '../types/cart.ts'

export const CartItem = ({ item }: { item: CartItemType }) => {
  const { addToCart, decreaseQuantity } = useCartStore()
  return (
    <div className="flex items-center gap-4 border p-4 rounded-xl">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h3>{item.title}</h3>
        <p className="text-gray-500">${item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => addToCart(item)}>+</button>
      </div>

      <div className="w-20 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  )
}
