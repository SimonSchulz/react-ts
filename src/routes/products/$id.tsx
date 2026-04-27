import { createFileRoute } from '@tanstack/react-router'
import { useProduct } from '../../shared/api/useProduct.ts'

export const Route = createFileRoute('/products/$id')({
  component: ProductPage
})

function ProductPage() {
  const { id } = Route.useParams()
  const { data, isLoading } = useProduct(id)

  if (isLoading) return <div>Loading...</div>

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

        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Add to cart
        </button>
      </div>
    </div>
  )
}
