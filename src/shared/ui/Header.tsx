import { Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth'
import { useMe } from '../api/hooks/useMe.ts'
import { useQueryClient } from '@tanstack/react-query'

export const Header = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, logout, openLogin } = useAuthStore()
  const { data } = useMe()

  const handleLogout = () => {
    logout()
    queryClient.removeQueries({ queryKey: ['me'] })
    navigate({ to: '/' })
  }

  const currentUser = data || user

  return (
    <header className="border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {currentUser ? (
          <Link to={`/me`}>
            <div className="flex items-center gap-3">
              <img
                src={currentUser.image}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full"
              />

              <span className="text-sm">{currentUser.username}</span>

              <button
                onClick={handleLogout}
                className="text-sm border px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          </Link>
        ) : (
          <button onClick={openLogin}>Login</button>
        )}
      </div>
    </header>
  )
}
