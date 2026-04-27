import type { Product } from '../types/product'

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  return await res.json()
}
