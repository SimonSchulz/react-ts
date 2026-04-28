import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../categories'
import { QUERY_KEYS } from '../../config/constants.ts'
const CASH_TIME = 1000 * 60 * 10
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
    staleTime: CASH_TIME,
    gcTime: CASH_TIME
  })
}
