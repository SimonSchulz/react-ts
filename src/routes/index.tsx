import { createFileRoute } from '@tanstack/react-router'
import { useProducts } from '../shared/api/hooks/useProducts'
import { ProductsGrid } from '../shared/ui/ProductsGrid'
import { ProductsGridSkeleton } from '../shared/ui/ProductsGridSkeleton'
import { useState } from 'react'
import { CategoriesList } from '../shared/ui/CategoriesList'
import { Pagination } from '../shared/ui/Pagination'
import { PAGINATION_LIMIT, QUERY_KEYS } from '../shared/config/constants'
import { ErrorBoundary } from '../shared/ui/ErrorBoundary'
import { queryClient } from '../shared/app/queryClient'

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
      <section className="flex flex-col gap-4 min-h-[600px]">
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
