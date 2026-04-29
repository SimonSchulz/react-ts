import { create } from 'zustand'

type Toast = {
  id: number
  text: string
}

type State = {
  toasts: Toast[]
  add: (text: string) => void
  remove: (id: number) => void
}

export const useToastStore = create<State>((set) => ({
  toasts: [],

  add: (text) => {
    const id = Date.now()
    set((s) => ({ toasts: [...s.toasts, { id, text }] }))

    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 2000)
  },

  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}))
