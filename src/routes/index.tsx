import { createFileRoute } from '@tanstack/react-router'
import { useProducts } from '../shared/api/hooks/useProducts'
import { ProductsGrid } from '../shared/ui/ProductsGrid'
import { ProductsGridSkeleton } from '../shared/ui/ProductsGridSkeleton'
import { useState } from 'react'
import { CategoriesList } from '../shared/ui/CategoriesList.tsx'
import { Pagination } from '../shared/ui/Pagination.tsx'
import { PAGINATION_LIMIT, QUERY_KEYS } from '../shared/config/constants.ts'
import { ErrorBoundary } from '../shared/ui/ErrorBoundary.tsx'
import { queryClient } from '../shared/app/queryClient.ts'
export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  const limit = PAGINATION_LIMIT
  const [category, setCategory] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useProducts(page, category)
  if (isError) {
    return (
      <ErrorBoundary
        message={(error as Error).message}
        onRetry={() =>
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] })
        }
      />
    )
  }
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

        <CategoriesList
          selected={category}
          onSelect={(cat) => {
            setCategory(cat)
            setPage(1)
          }}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Popular Products</h2>

        {isLoading ? (
          <ProductsGridSkeleton />
        ) : (
          <ProductsGrid products={data?.products || []} />
        )}
      </section>

      <Pagination
        page={page}
        total={data?.total || 0}
        limit={limit}
        onChange={setPage}
      />
    </div>
  )
}
