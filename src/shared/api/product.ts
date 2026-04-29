import type { ProductFull } from '../types/product'
import { fetcher } from './fetcher.ts'

export const getProductById = async (id: string): Promise<ProductFull> => {
  return fetcher(`https://dummyjson.com/products/${id}`)
}
