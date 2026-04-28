import type { Product } from '../types/product'
import { fetcher } from './fetcher.ts'

export const getProductById = async (id: string): Promise<Product> => {
  return fetcher(`https://dummyjson.com/products/${id}`)
}
