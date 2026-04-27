import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../product.ts'

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id)
  })
}
