import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/auth.ts'
import { getMe } from '../me.ts'
import { QUERY_KEYS } from '../../config/constants.ts'

export const useMe = () => {
  const user = useAuthStore((state) => state.user)
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: getMe,
    enabled: !!user?.accessToken,
    retry: false
  })
}
