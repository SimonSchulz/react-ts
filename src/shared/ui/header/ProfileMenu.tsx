import { Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../../store/auth'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

export const ProfileMenu = ({ user }: any) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { logout } = useAuthStore()

  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    queryClient.removeQueries({ queryKey: ['me'] })
    navigate({ to: '/' })
    setOpen(false)
  }

  React.useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', click)
    document.addEventListener('keydown', esc)

    return () => {
      document.removeEventListener('mousedown', click)
      document.removeEventListener('keydown', esc)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((p) => !p)}>
        <img
          src={user.image}
          className="w-8 h-8 rounded-full border"
          alt={user.name}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-3 py-2 border-b text-sm font-medium truncate">
            {user.username}
          </div>

          <Link
            to="/me"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 hover:bg-gray-100 text-sm"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
