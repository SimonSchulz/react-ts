import { createFileRoute } from '@tanstack/react-router'
import { useProducts } from '../shared/api/hooks/useProducts'
import { ProductsGrid } from '../shared/ui/ProductsGrid'
import { ProductsGridSkeleton } from '../shared/ui/ProductsGridSkeleton'

export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  const { data, isLoading } = useProducts()
  return (
    <div className="flex flex-col gap-12">
      <section className="bg-gray-100 rounded-xl p-10 text-center">
        <h1 className="text-3xl font-semibold mb-2">Simple Store</h1>
        <p className="text-gray-500">
          Clean shopping experience with modern stack
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Categories</h2>

        <div className="flex gap-3 flex-wrap">
          {['smartphones', 'laptops', 'fragrances', 'skincare'].map((cat) => (
            <button
              key={cat}
              className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Popular Products</h2>

        {isLoading ? (
          <ProductsGridSkeleton />
        ) : (
          <ProductsGrid products={data || []} />
        )}
      </section>
    </div>
  )
}
