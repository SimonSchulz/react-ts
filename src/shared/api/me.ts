import { fetcher } from './fetcher'
import { getUser } from '../lib/user'
import type { User } from '../types/user.ts'

export const getMe = async (): Promise<User> => {
  const user = getUser()
  return fetcher('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`
    }
  })
}
