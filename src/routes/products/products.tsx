import { useProducts } from '../../shared/api/hooks/useProducts'
import { Pagination } from '../../shared/ui/Pagination'
import { useDebounce } from '../../shared/lib/useDebounce'
import { PAGINATION_LIMIT, QUERY_KEYS } from '../../shared/config/constants'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary'
import { queryClient } from '../../shared/app/queryClient'
import { ProductsGrid } from '../../shared/ui/product/ProductsGrid'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { EmptyState } from '../../shared/ui/EmptyState'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const navigate = useNavigate()
  const { page = 1, q = '' } = useSearch({
    from: '/products/'
  })
  const [input, setInput] = useState(q)
  const debounced: string = useDebounce(input, 400)

  useEffect(() => {
    navigate({
      to: '/products/',
      search: {
        q: debounced,
        page: 1
      }
    })
  }, [debounced])

  const { data, isLoading, isError, error } = useProducts(
    page,
    undefined,
    debounced
  )

  const handlePageChange = (p: number) => {
    navigate({
      to: '/products/',
      search: {
        page: p,
        q
      }
    })
  }

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
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded-lg px-4 py-2 text-sm"
      />

      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : !data || data.products.length === 0 ? (
          <EmptyState
            title="No products found"
            description={`No results for "${q}"`}
            actionText="Reset search"
            onAction={() =>
              navigate({
                to: '/products/',
                search: { page: 1, q: '' }
              })
            }
          />
        ) : (
          <ProductsGrid products={data.products} />
        )}
      </div>

      <Pagination
        page={page}
        total={data?.total || 0}
        limit={PAGINATION_LIMIT}
        onChange={handlePageChange}
      />
    </div>
  )
}
