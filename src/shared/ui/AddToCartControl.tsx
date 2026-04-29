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

  if (!item) {
    return (
      <button
        onClick={() => add(product)}
        className="bg-black text-white px-4 py-2 rounded-lg w-full"
      >
        Add to cart
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 mx-auto">
      <button
        onClick={() => decrease(product.id)}
        className="border px-3 py-1 rounded"
      >
        -
      </button>

      <span className="min-w-[20px] text-center">{item.quantity}</span>

      <button onClick={() => add(product)} className="border px-3 py-1 rounded">
        +
      </button>
    </div>
  )
}
