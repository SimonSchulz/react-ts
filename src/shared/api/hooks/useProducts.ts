import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../products.ts'

export const useProducts = (
  page: number,
  category?: string,
  search?: string
) => {
  return useQuery({
    queryKey: ['products', page, category, search],
    queryFn: () => getProducts(page, category, search),
    placeholderData: (prev) => prev
  })
}
