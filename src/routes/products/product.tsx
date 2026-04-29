import { useProduct } from '../../shared/api/hooks/useProduct'
import { useCartStore } from '../../shared/store/cart'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary'
import { queryClient } from '../../shared/app/queryClient'
import { QUERY_KEYS } from '../../shared/config/constants'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import type { Review } from '../../shared/types/product'

export default function ProductPage() {
  const { id } = useParams({ from: '/products/$id' })
  const { data, isLoading, isError } = useProduct(id)

  const addToCart = useCartStore((s) => s.addToCart)

  const [activeImage, setActiveImage] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
        <div className="bg-gray-200 h-96 rounded-xl" />
        <div className="flex flex-col gap-4">
          <div className="h-6 bg-gray-200 w-1/2" />
          <div className="h-6 bg-gray-200 w-1/4" />
          <div className="h-20 bg-gray-200" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorBoundary
        onRetry={() =>
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT] })
        }
      />
    )
  }

  if (!data) return <div className="p-6">Not found</div>

  const isLowStock = data.stock < 10
  const image = activeImage || data.thumbnail

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-3">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {[data.thumbnail, ...(data.images || [])].map((img) => (
              <img
                key={img}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 object-cover rounded-lg border cursor-pointer ${
                  image === img ? 'ring-2 ring-black' : ''
                }`}
                alt={data.title}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">{data.title}</h1>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl font-bold text-green-600">
              ${data.price}
            </span>

            {data.discountPercentage && (
              <span className="text-sm text-red-500">
                -{data.discountPercentage}%
              </span>
            )}

            <span className="bg-yellow-100 px-3 py-1 rounded text-sm">
              ⭐ {data.rating.toFixed(1)}
            </span>
          </div>

          <div
            className={`text-sm px-3 py-1 rounded w-fit ${
              isLowStock ? 'bg-red-100 text-red-600' : 'bg-gray-100'
            }`}
          >
            {isLowStock ? `Low stock (${data.stock})` : data.availabilityStatus}
          </div>

          <button
            onClick={() =>
              addToCart({
                id: data.id,
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail
              })
            }
            className="bg-black text-white py-3 rounded-lg hover:opacity-90"
          >
            Add to cart
          </button>

          <p className="text-gray-600 text-sm">{data.description}</p>

          <div className="text-sm text-gray-500">
            {data.brand} • {data.category}
          </div>
        </div>
      </div>

      {data.reviews && data.reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Reviews</h2>

          {data.reviews.map((r: Review, i) => (
            <div key={i} className="border p-3 rounded-lg text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{r.reviewerName}</span>
                <span>⭐ {r.rating}</span>
              </div>
              <div className="text-gray-600">{r.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
