import { useProduct } from '../../shared/api/hooks/useProduct'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary'
import { queryClient } from '../../shared/app/queryClient'
import { QUERY_KEYS } from '../../shared/config/constants'
import { useParams } from '@tanstack/react-router'
import { ProductGallery } from '../../shared/ui/product/ProductGallery.tsx'
import { ProductInfo } from '../../shared/ui/product/ProductInfo.tsx'
import { ProductReviews } from '../../shared/ui/product/ProductReviews.tsx'

export default function ProductPage() {
  const { id } = useParams({ from: '/products/$id' })
  const { data, isLoading, isError } = useProduct(id)
  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError) {
    return (
      <ErrorBoundary
        onRetry={() =>
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT] })
        }
      />
    )
  }
  if (!data) return <div className="p-6">Not found</div>
  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery
          thumbnail={data.thumbnail}
          images={data.images}
          title={data.title}
        />
        <ProductInfo product={data} />
      </div>
      <ProductReviews reviews={data.reviews} />
    </div>
  )
}
