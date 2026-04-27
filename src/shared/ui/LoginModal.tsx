import { useState } from 'react'
import { useAuthStore } from '../store/auth'
import { useLogin } from '../api/hooks/useLogin.ts'
import { useNavigate } from '@tanstack/react-router'

export const LoginModal = () => {
  const { isLoginOpen, closeLogin, setUser } = useAuthStore()
  const navigate = useNavigate()
  const { mutate, isPending } = useLogin()

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')

  if (!isLoginOpen) return null

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          setUser(data)
          closeLogin()
          navigate({ to: '/products' })
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 flex flex-col gap-4 w-80"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="border p-2"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border p-2"
        />

        <button className="bg-black text-white p-2">
          {isPending ? 'Loading...' : 'Login'}
        </button>

        <button type="button" onClick={closeLogin}>
          Close
        </button>
      </form>
    </div>
  )
}
