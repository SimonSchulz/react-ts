import { jwtDecode } from 'jwt-decode'
import { getUser } from './user.ts'

type JwtPayload = {
  exp: number
}

export const isAuthenticated = () => {
  const user = getUser()
  if (!user || !user.accessToken) return false
  try {
    const decoded = jwtDecode<JwtPayload>(user.accessToken)
    const isExpired = decoded.exp * 1000 < Date.now()
    return !isExpired
  } catch {
    return false
  }
}
