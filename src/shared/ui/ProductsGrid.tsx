import { ProductCard } from './ProductCard'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
}

type Props = {
  products: Product[]
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
