import { Link } from '@tanstack/react-router'
import type { Product } from '../types/product'
import { useCartStore } from '../store/cart'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/constants'
import * as React from 'react'
import { getProductById } from '../api/product.ts'

type Props = {
  product: Product
  priority?: boolean
}

export const ProductCard = ({ product, priority }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const queryClient = useQueryClient()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.PRODUCT, product.id],
      queryFn: () => getProductById(product.id)
    })

    const img = new Image()
    img.src = product.thumbnail
  }

  return (
    <Link
      to="/products/$id"
      params={{ id: String(product.id) }}
      onMouseEnter={handlePrefetch}
      className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 hover:scale-[1.02] will-change-transform transition"
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        <span className="text-base font-semibold">${product.price}</span>
      </div>

      <button
        onClick={handleAdd}
        className="mt-auto bg-black text-white py-2 rounded hover:opacity-90 transition"
      >
        Add to cart
      </button>
    </Link>
  )
}
