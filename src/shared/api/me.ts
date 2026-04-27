import { getUser } from '../lib/user.ts'
import type { User } from '../types/user.ts'

export const getMe = async (): Promise<User> => {
  const user = getUser()

  const res = await fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user?.accessToken}`
    }
  })

  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  return res.json()
}
