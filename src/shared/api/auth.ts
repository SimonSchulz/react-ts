import type { AuthUser } from '../types/auth'
import type { Login } from '../types/login.ts'

export const login = async ({
  username,
  password
}: Login): Promise<AuthUser> => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include'
  })

  if (!res.ok) {
    throw new Error('Login failed')
  }

  return res.json()
}
