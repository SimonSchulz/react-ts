import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../categories'
import { QUERY_KEYS } from '../../config/constants.ts'

export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories
  })
}
