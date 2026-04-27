import { createFileRoute } from '@tanstack/react-router'
import { ProductsGridSkeleton } from '../../shared/ui/ProductsGridSkeleton'
import { ProductsGrid } from '../../shared/ui/ProductsGrid'
import { useProducts } from '../../shared/api/hooks/useProducts'
import { useState } from 'react'
import { Pagination } from '../../shared/ui/Pagination'
import { CategoriesList } from '../../shared/ui/CategoriesList'
import { PRODUCTS_LIMIT } from '../../shared/config/constants.ts'

export const Route = createFileRoute('/products/')({
  component: ProductsPage
})

function ProductsPage() {
  const limit = PRODUCTS_LIMIT
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState<string | undefined>()

  const { data, isLoading } = useProducts(page, category)

  if (isLoading) return <ProductsGridSkeleton />

  return (
    <div className="flex flex-col gap-6">
      <CategoriesList
        selected={category}
        onSelect={(cat) => {
          setCategory(cat)
          setPage(1)
        }}
      />

      <ProductsGrid products={data?.products || []} />

      <Pagination
        page={page}
        total={data?.total || 0}
        limit={limit}
        onChange={setPage}
      />
    </div>
  )
}
