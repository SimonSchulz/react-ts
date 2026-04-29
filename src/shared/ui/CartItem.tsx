import { Link } from '@tanstack/react-router'
import { useCartStore } from '../store/cart'
import type { CartItem as Item } from '../types/cart'

type Props = {
  item: Item
}

export const CartItem = ({ item }: Props) => {
  const remove = useCartStore((s) => s.removeFromCart)
  const decrease = useCartStore((s) => s.decreaseQuantity)
  const add = useCartStore((s) => s.addToCart)

  return (
    <div className="grid grid-cols-[80px_1fr_auto] gap-4 items-center border rounded-xl p-4 bg-white shadow-sm">
      <Link to="/products/$id" params={{ id: String(item.id) }}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </Link>

      <div className="flex flex-col gap-2">
        <Link
          to="/products/$id"
          params={{ id: String(item.id) }}
          className="font-medium hover:underline"
        >
          {item.title}
        </Link>

        <div className="text-sm text-gray-500">${item.price} per item</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => decrease(item.id)}
            className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
          >
            -
          </button>

          <span className="w-8 text-center font-medium tabular-nums">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              add({
                id: item.id,
                title: item.title,
                price: item.price,
                thumbnail: item.thumbnail
              })
            }
            className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <div className="w-24 text-right font-semibold tabular-nums">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <button
          onClick={() => remove(item.id)}
          className="w-16 text-xs text-red-500 hover:text-red-700 text-right"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
