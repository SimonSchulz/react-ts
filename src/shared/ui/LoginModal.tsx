import { useState, useRef, useEffect, type SubmitEventHandler } from 'react'
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

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeLogin()
      }
    }

    if (isLoginOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isLoginOpen, closeLogin])

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95"
      >
        <button
          onClick={closeLogin}
          className="absolute right-4 top-4 text-gray-400 hover:text-black transition"
        >
          ✕
        </button>

        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-xl font-semibold">Sign in</h2>
          <p className="text-sm text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              reset()
            }}
            placeholder="Username"
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              reset()
            }}
            placeholder="Password"
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          {isError && (
            <div className="text-sm text-red-500">
              {(error as Error).message || 'Login failed'}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 rounded-lg bg-black py-2 text-sm text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
