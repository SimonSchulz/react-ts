import { Link } from '@tanstack/react-router'

type Props = {
  open: boolean
  onClose: () => void
  user?: {
    username: string
  } | null
}

export const MobileMenu = ({ open, onClose, user }: Props) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose}>
      <div
        className="bg-white w-64 h-full p-4 flex flex-col gap-4 transform transition-transform duration-300 translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="self-end text-xl">
          ✕
        </button>

        <Link to="/" onClick={onClose}>
          Home
        </Link>

        <Link to="/products" onClick={onClose}>
          Search
        </Link>

        <Link to="/chat" onClick={onClose}>
          Chat
        </Link>

        <Link to="/cart" onClick={onClose}>
          Cart
        </Link>

        <div className="border-t pt-4 mt-auto">
          {user ? (
            <Link to="/me" onClick={onClose}>
              {user.username}
            </Link>
          ) : (
            <span className="text-gray-500 text-sm">Not logged in</span>
          )}
        </div>
      </div>
    </div>
  )
}
