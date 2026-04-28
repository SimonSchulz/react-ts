import { fetcher } from './fetcher.ts'
import type { ProductResponse } from '../types/product.ts'

export const getProducts = async (
  page: number,
  category?: string,
  search?: string,
  limit = 16
): Promise<ProductResponse> => {
  const skip = (page - 1) * limit
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  if (category) {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  }
  if (search) {
    url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
  }
  return fetcher(url)
}
