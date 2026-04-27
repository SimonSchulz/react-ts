import { Link } from '@tanstack/react-router'
import type { Product } from '../types/product.ts'

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Link
      to="/products/$id"
      params={{ id: String(product.id) }}
      className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 hover:scale-[1.02] transition"
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        <span className="text-base font-semibold">${product.price}</span>
      </div>
    </Link>
  )
}
