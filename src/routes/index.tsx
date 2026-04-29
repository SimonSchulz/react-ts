import { useProducts } from '../shared/api/hooks/useProducts'
import { useNavigate, useSearch, createFileRoute } from '@tanstack/react-router'
import { Pagination } from '../shared/ui/Pagination'
import { PAGINATION_LIMIT, QUERY_KEYS } from '../shared/config/constants'
import { ErrorBoundary } from '../shared/ui/ErrorBoundary'
import { queryClient } from '../shared/app/queryClient'
import { CategoriesList } from '../shared/ui/caterory/CategoriesList.tsx'
import { ProductsGridSkeleton } from '../shared/ui/product/ProductsGridSkeleton.tsx'
import { ProductsGrid } from '../shared/ui/product/ProductsGrid.tsx'
import { useState } from 'react'
import type { SearchParams } from '../shared/types/searchParams.ts'

export const Route = createFileRoute('/')({
  validateSearch: (search) => ({
    page: Number(search.page) > 0 ? Number(search.page) : 1
  }),
  component: HomePage
})

function HomePage() {
  const navigate = useNavigate()
  const { page = 1 } = useSearch({ from: '/' })

  const [category, setCategory] = useState<string | undefined>()

  const { data, isLoading, isError, error } = useProducts(page, category)

  const handlePageChange = (p: number) => {
    navigate({
      to: '/',
      search: (prev: SearchParams) => ({
        ...prev,
        page: p
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
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Categories</h2>

        <CategoriesList
          selected={category}
          onSelect={(cat) => {
            setCategory(cat)
            handlePageChange(1)
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
        limit={PAGINATION_LIMIT}
        onChange={handlePageChange}
      />
    </div>
  )
}
