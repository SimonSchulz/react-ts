import { useCartStore } from '../store/cart'
import type { Product } from '../types/product'
import { useToastStore } from '../lib/useToast.ts'

export const AddToCartControl = ({ product }: { product: Product }) => {
  const items = useCartStore((s) => s.items)
  const add = useCartStore((s) => s.addToCart)
  const decrease = useCartStore((s) => s.decreaseQuantity)
  const toast = useToastStore((s) => s.add)
  const item = items.find((i) => i.id === product.id)
  const stock = product.stock ?? Infinity
  const quantity = item?.quantity || 0
  if (!item) {
    return (
      <button
        onClick={() => {
          add(product)
          toast('Added to cart')
        }}
        disabled={stock === 0}
        className="bg-black text-white px-4 py-2 rounded-lg w-full hover:opacity-90 disabled:opacity-50 transition"
      >
        Add to cart
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 mx-auto">
      <button
        onClick={() => decrease(product.id)}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 transition"
      >
        -
      </button>

      <span className="w-8 text-center font-medium tabular-nums">
        {quantity}
      </span>

      <button
        onClick={() => {
          add(product)
          toast('Added')
        }}
        disabled={quantity >= stock}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition"
      >
        +
      </button>
    </div>
  )
}
