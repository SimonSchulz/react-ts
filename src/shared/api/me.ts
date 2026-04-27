import { getUser, removeUser } from '../lib/user.ts'

export const getMe = async () => {
  const user = getUser()

  const res = await fetch('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`
    }
  })

  if (res.status === 401) {
    removeUser()
    throw new Error('Unauthorized')
  }
  return res.json()
}
