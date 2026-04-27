import type { AuthUser } from '../types/auth'

const KEY = 'user'

export const getUser = (): AuthUser | null => {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : null
}

export const setUser = (user: AuthUser) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

export const removeUser = () => {
  localStorage.removeItem(KEY)
}