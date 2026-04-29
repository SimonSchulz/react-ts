import { useCartStore } from '../store/cart'
import type { Product } from '../types/product.ts'

type Props = {
  product: Product
}

export const ChatProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((s) => s.addToCart)
  const isLowStock = product.stock !== undefined && product.stock < 10
  return (
    <div className="self-start w-full max-w-[75%] border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="font-semibold text-sm">{product.title}</div>
        {product.price !== undefined && (
          <div className="text-green-600 font-semibold text-sm">
            ${product.price}
          </div>
        )}
      </div>
      {(product.brand || product.category) && (
        <div className="text-xs text-gray-500">
          {product.brand}
          {product.brand && product.category && ' • '}
          {product.category}
        </div>
      )}
      <div className="flex gap-2 text-xs flex-wrap">
        {product.rating !== undefined && (
          <span className="bg-yellow-100 px-2 py-1 rounded">
            ⭐ {product.rating.toFixed(1)}
          </span>
        )}
        {product.stock !== undefined && (
          <span
            className={`px-2 py-1 rounded ${
              isLowStock
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isLowStock
              ? `Low stock (${product.stock})`
              : `Stock: ${product.stock}`}
          </span>
        )}
      </div>
      {product.returnPolicy && (
        <div className="text-xs text-gray-400">{product.returnPolicy}</div>
      )}
      <button
        onClick={() =>
          addToCart({
            ...product,
            price: product.price || 0
          })
        }
        className="mt-2 bg-black text-white text-sm py-2 rounded hover:opacity-90"
      >
        Add to cart
      </button>
    </div>
  )
}
