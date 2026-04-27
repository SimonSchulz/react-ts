import { createFileRoute } from '@tanstack/react-router'
import { ProductsGridSkeleton } from '../../shared/ui/ProductsGridSkeleton.tsx'
import { ProductsGrid } from '../../shared/ui/ProductsGrid.tsx'
import { useProducts } from '../../shared/api/hooks/useProducts.ts'

export const Route = createFileRoute('/products/')({
  component: ProductsPage
})

function ProductsPage() {
  const { data, isLoading } = useProducts()
  if (isLoading) return <ProductsGridSkeleton />
  return <ProductsGrid products={data ?? []} />
}
