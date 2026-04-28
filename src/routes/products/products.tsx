import { useProducts } from '../../shared/api/hooks/useProducts'
import { ProductsGrid } from '../../shared/ui/ProductsGrid'
import { ProductsGridSkeleton } from '../../shared/ui/ProductsGridSkeleton'
import { CategoriesList } from '../../shared/ui/CategoriesList'
import { Pagination } from '../../shared/ui/Pagination'
import { useState } from 'react'
import { useDebounce } from '../../shared/lib/useDebounce'
import { PAGINATION_LIMIT, QUERY_KEYS } from '../../shared/config/constants'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary'
import { queryClient } from '../../shared/app/queryClient'

export default function ProductsPage() {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState<string | undefined>()
  const [search, setSearch] = useState('')

  const debounced = useDebounce(search, 400)

  const { data, isLoading, isError, error } = useProducts(
    page,
    category,
    debounced
  )

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
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-8">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        placeholder="Search products..."
        className="w-full border rounded-lg px-4 py-2"
      />

      <CategoriesList
        selected={category}
        onSelect={(cat) => {
          setCategory(cat)
          setPage(1)
        }}
      />

      <div className="min-h-[600px]">
        {isLoading ? (
          <ProductsGridSkeleton />
        ) : (
          <ProductsGrid products={data?.products || []} />
        )}
      </div>

      <Pagination
        page={page}
        total={data?.total || 0}
        limit={PAGINATION_LIMIT}
        onChange={setPage}
      />
    </div>
  )
}
