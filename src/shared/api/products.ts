import type { Product } from '../types/product'

type Response = {
  products: Product[]
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://dummyjson.com/products')
  const data: Response = await res.json()
  return data.products
}
