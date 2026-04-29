import { useProducts } from '../../shared/api/hooks/useProducts'
import { Pagination } from '../../shared/ui/Pagination'
import { useState } from 'react'
import { useDebounce } from '../../shared/lib/useDebounce'
import { PAGINATION_LIMIT, QUERY_KEYS } from '../../shared/config/constants'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary'
import { queryClient } from '../../shared/app/queryClient'
import { ProductsGridSkeleton } from '../../shared/ui/product/ProductsGridSkeleton.tsx'
import { ProductsGrid } from '../../shared/ui/product/ProductsGrid.tsx'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { SearchParams } from '../../shared/types/searchParams.ts'

export default function ProductsPage() {
  const navigate = useNavigate()

  const { page = 1, q = '' } = useSearch({
    from: '/products/'
  })

  const debounced = useDebounce(q, 400)

  const { data, isLoading, isError, error } = useProducts(
    page,
    undefined,
    debounced
  )

  const handlePageChange = (p: number) => {
    navigate({
      to: '/products',
      search: (prev) => ({
        ...prev,
        page: p
      })
    })
  }

  const handleSearchChange = (value: string) => {
    navigate({
      to: '/products',
      search: (prev) => ({
        ...prev,
        q: value,
        page: 1
      })
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
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-8">
      <input
        value={q}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded-lg px-4 py-2"
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
        onChange={handlePageChange}
      />
    </div>
  )
}
