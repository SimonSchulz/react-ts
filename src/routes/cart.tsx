import { createFileRoute } from '@tanstack/react-router'
import { useCartStore } from '../shared/store/cart'

export const Route = createFileRoute('/cart')({
  component: CartPage
})

function CartPage() {
  const { items, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCartStore()

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
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-xl"
          >
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
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="border px-2"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    thumbnail: item.thumbnail
                  })
                }
                className="border px-2"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-gray-400 hover:text-black"
            >
              Remove
            </button>

            <div className="w-20 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
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
