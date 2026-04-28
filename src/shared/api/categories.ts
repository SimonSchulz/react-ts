import { fetcher } from './fetcher'
import type { Category } from '../types/category'

export const getCategories = (): Promise<Category[]> => {
  return fetcher('https://dummyjson.com/products/categories')
}
