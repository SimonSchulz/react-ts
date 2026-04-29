import type { Product } from '../../types/product.ts'
import { AddToCartControl } from '../AddToCartControl.tsx'

export const ProductInfo = ({ product }: { product: Product }) => {
  const isLowStock = (product.stock ?? 0) < 5

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-green-600">
          ${product.price}
        </span>
        <span className="bg-yellow-100 px-3 py-1 rounded text-sm">
          ⭐ {(product?.rating ?? 0).toFixed(1)}
        </span>
      </div>
      <div
        className={`text-sm px-3 py-1 rounded w-fit ${
          product.stock === 0
            ? 'bg-gray-200 text-gray-500'
            : isLowStock
              ? 'bg-red-100 text-red-600'
              : 'bg-green-100 text-green-600'
        }`}
      >
        {product.stock === 0
          ? 'Out of stock'
          : isLowStock
            ? `Low stock (${product.stock})`
            : `In stock (${product.stock})`}
      </div>
      <AddToCartControl product={product} />
      <p className="text-gray-600 text-sm">{product.description}</p>
      <div className="text-sm text-gray-500">
        {product.brand} • {product.category}
      </div>
    </div>
  )
}
