import { useCartStore } from '../store/cart'
import type { Product } from '../types/product'

type Props = {
  product: Product
}

export const AddToCartControl = ({ product }: Props) => {
  const items = useCartStore((s) => s.items)
  const add = useCartStore((s) => s.addToCart)
  const decrease = useCartStore((s) => s.decreaseQuantity)

  const item = items.find((i) => i.id === product.id)

  const stock = product.stock ?? Infinity
  const quantity = item?.quantity || 0

  if (!item) {
    return (
      <button
        onClick={() => add(product)}
        disabled={stock === 0}
        className="bg-black text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
      >
        Add to cart
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => decrease(product.id)}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
      >
        -
      </button>

      <span className="w-8 text-center font-medium tabular-nums">
        {quantity}
      </span>

      <button
        onClick={() => add(product)}
        disabled={quantity >= stock}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
      >
        +
      </button>
    </div>
  )
}
