import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../products'
import { QUERY_KEYS } from '../../config/constants.ts'

export const useProducts = (page: number, category?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, page, category],
    queryFn: () => getProducts(page, category),
    placeholderData: (prev) => prev
  })
}
