import { createFileRoute } from '@tanstack/react-router'
import { useProduct } from '../../shared/api/hooks/useProduct'
import { useCartStore } from '../../shared/store/cart'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary.tsx'
import { queryClient } from '../../shared/app/queryClient.ts'
import { QUERY_KEYS } from '../../shared/config/constants.ts'

export const Route = createFileRoute('/products/$id')({
  component: ProductPage
})

function ProductPage() {
  const { id } = Route.useParams()

  const { data, isLoading, isError } = useProduct(id)
  const addToCart = useCartStore((state) => state.addToCart)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
        <div className="bg-gray-200 h-80 rounded-xl" />
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
  if (!data) return <div>Not found</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="aspect-square">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <span className="text-xl font-bold">${data.price}</span>
        <p className="text-gray-500">{data.description}</p>

        <button
          onClick={() =>
            addToCart({
              id: data.id,
              title: data.title,
              price: data.price,
              thumbnail: data.thumbnail
            })
          }
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
