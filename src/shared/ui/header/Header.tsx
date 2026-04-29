import { Link } from '@tanstack/react-router'
import { useCartStore } from '../../store/cart'
import { useMe } from '../../api/hooks/useMe'
import { useAuthStore } from '../../store/auth'
import * as React from 'react'
import { MobileMenu } from './MobileMenu'
import { ProfileMenu } from './ProfileMenu'
import { CartPreview } from '../CartPreview.tsx'

export const Header = () => {
  const { data } = useMe()
  const { user, openLogin } = useAuthStore()
  const items = useCartStore((s) => s.items)
  const totalCount = items.reduce((a, i) => a + i.quantity, 0)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const currentUser = data || user

  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden text-xl"
          >
            ☰
          </button>
          <Link to="/" className="font-semibold">
            STORE
          </Link>
          <div className="hidden sm:flex gap-4 text-sm ml-4">
            <Link to="/products">Search</Link>
            <Link to="/chat">Chat</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Link to="/cart" className="relative flex items-center">
              <img src="/cart.svg" className="w-5 h-5" alt="cart" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-2 min-w-5 text-center">
                  {totalCount}
                </span>
              )}
            </Link>

            <CartPreview />
          </div>
          {currentUser ? (
            <ProfileMenu user={currentUser} />
          ) : (
            <button
              onClick={openLogin}
              className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={currentUser}
      />
    </header>
  )
}