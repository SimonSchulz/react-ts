import { Link } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import type { Product } from '../../types/product.ts'
import { QUERY_KEYS } from '../../config/constants.ts'
import { getProductById } from '../../api/product.ts'
import { AddToCartControl } from '../AddToCartControl.tsx'

type Props = {
  product: Product
  priority?: boolean
}

export const ProductCard = ({ product, priority }: Props) => {
  const queryClient = useQueryClient()

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.PRODUCT, product.id],
      queryFn: () => getProductById(product.id)
    })

    const img = new Image()
    img.src = product.thumbnail
  }

  return (
    <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-3 hover:scale-[1.02] transition">
      <Link
        to="/products/$id"
        params={{ id: String(product.id) }}
        onMouseEnter={handlePrefetch}
        className="flex flex-col gap-2"
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
      </Link>

      <AddToCartControl product={product} />
    </div>
  )
}
