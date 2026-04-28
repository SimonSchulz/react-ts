import { removeUser } from '../lib/user'
import { queryClient } from '../app/queryClient.ts'

export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, options)

  if (!res.ok) {
    if (res.status === 401) {
      removeUser()
      queryClient.clear()
      window.location.href = '/'
      throw new Error('Unauthorized')
    }
    throw new Error(`Error ${res.status}`)
  }
  return res.json()
}
