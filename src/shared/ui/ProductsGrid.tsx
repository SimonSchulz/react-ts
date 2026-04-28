import { ProductCard } from './ProductCard'
import type { ProductResponse } from '../types/product'

export const ProductsGrid = ({ products }: ProductResponse) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i === 0} />
      ))}
    </div>
  )
}
