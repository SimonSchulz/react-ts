import { type SubmitEventHandler, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { useLogin } from '../api/hooks/useLogin'
import { setUser } from '../lib/user'
import { useNavigate } from '@tanstack/react-router'

export const LoginModal = () => {
  const { isLoginOpen, closeLogin } = useAuthStore()
  const navigate = useNavigate()
  const { mutate, isPending, isError, error, reset } = useLogin()

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')

  if (!isLoginOpen) return null

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
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
        className="bg-white p-6 flex flex-col gap-4 w-80 rounded-lg"
      >
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            reset()
          }}
          placeholder="username"
          className="border p-2"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            reset()
          }}
          placeholder="password"
          className="border p-2"
        />

        {isError && (
          <div className="text-red-500 text-sm">
            {(error as Error).message || 'Login failed'}
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white p-2 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Login'}
        </button>

        <button type="button" onClick={closeLogin}>
          Close
        </button>
      </form>
    </div>
  )
}
