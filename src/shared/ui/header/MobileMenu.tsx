import { Link } from '@tanstack/react-router'

export const MobileMenu = ({ open, onClose, user }: any) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="bg-white w-64 h-full p-4 flex flex-col gap-4">
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

        <div className="border-t pt-4">
          {user ? (
            <>
              <Link to="/me" onClick={onClose}>
                {user.username}
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
