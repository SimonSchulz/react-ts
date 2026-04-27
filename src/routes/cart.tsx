import { createFileRoute } from '@tanstack/react-router'
import { useCartStore } from '../shared/store/cart'
import { CartItem } from '../shared/ui/CartItem.tsx'

export const Route = createFileRoute('/cart')({
  component: CartPage
})

function CartPage() {
  const { items, clearCart } = useCartStore()

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

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
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-black"
        >
          Clear cart
        </button>

        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  )
}
