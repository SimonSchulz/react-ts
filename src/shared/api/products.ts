import { fetcher } from './fetcher'
import type { Product } from '../types/product'

type Response = {
  products: Product[]
  total: number
}

export const getProducts = async (
  page: number,
  category?: string,
  limit = 16
): Promise<Response> => {
  const skip = (page - 1) * limit

  const base = category
    ? `https://dummyjson.com/products/category/${category}`
    : `https://dummyjson.com/products`

  return fetcher(`${base}?limit=${limit}&skip=${skip}`)
}
