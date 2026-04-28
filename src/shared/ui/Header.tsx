import { Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth'
import { useMe } from '../api/hooks/useMe'
import { useQueryClient } from '@tanstack/react-query'
import { useCartStore } from '../store/cart'
import * as React from 'react'

export const Header = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { user, logout, openLogin } = useAuthStore()
  const { data } = useMe()

  const items = useCartStore((state) => state.items)
  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0)

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
    queryClient.removeQueries({ queryKey: ['me'] })
    navigate({ to: '/' })
  }

  const currentUser = data || user

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </div>

        <div className="flex gap-6 items-center">
          <Link
            to="/cart"
            className="relative flex items-center gap-1 text-gray-600 hover:text-black transition"
          >
            {/* ✅ фикс пути */}
            <img src="/cart.svg" alt="cart" className="w-5 h-5" />

            <span>Cart</span>

            {totalCount > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-black text-white rounded-full px-2 min-w-[20px] text-center">
                {totalCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <Link to="/me">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.image}
                  alt={currentUser.username}
                  className="w-8 h-8 rounded-full object-cover"
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
      </div>
    </header>
  )
}
