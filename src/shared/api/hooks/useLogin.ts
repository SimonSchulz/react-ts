import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/auth.ts'
import { login } from '../auth.ts'

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data)
    }
  })
}
