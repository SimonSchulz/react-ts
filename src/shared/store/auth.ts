import { create } from 'zustand'
import type { AuthUser } from '../types/auth'
import { getUser, removeUser, setUser } from '../lib/user.ts'

type AuthState = {
  user: AuthUser | null
  isLoginOpen: boolean
  setUser: (user: AuthUser) => void
  logout: () => void
  openLogin: () => void
  closeLogin: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getUser(),
  isLoginOpen: false,

  setUser: (user) => {
    setUser(user)
    set({ user, isLoginOpen: false })
  },

  logout: () => {
    removeUser()
    set({ user: null })
  },

  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false })
}))
