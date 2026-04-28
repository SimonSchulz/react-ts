import { useCartStore } from '../shared/store/cart'
import { CartItem } from '../shared/ui/CartItem'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleClear = () => {
    if (confirm('Clear the cart?')) {
      clearCart()
    }
  }

  if (items.length === 0) {
    return <div className="text-center mt-10">Cart is empty</div>
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <button
          onClick={handleClear}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Clear cart
        </button>

        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  )
}
