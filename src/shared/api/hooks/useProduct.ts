import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../product.ts'
import { QUERY_KEYS } from '../../config/constants.ts'

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => getProductById(id)
  })
}
