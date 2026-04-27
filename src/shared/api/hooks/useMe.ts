import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/auth.ts'
import { getMe } from '../me.ts'

export const useMe = () => {
  const user = useAuthStore((state) => state.user)
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: Boolean(user?.accessToken),
    retry: false
  })
}
