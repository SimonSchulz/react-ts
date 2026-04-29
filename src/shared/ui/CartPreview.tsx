
import { Link } from '@tanstack/react-router'
import { useCartStore } from '../store/cart.ts'

export const CartPreview = () => {
  const items = useCartStore((s) => s.items)

  if (items.length === 0) return null

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white border rounded-xl shadow-lg p-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition z-50">
      <div className="flex flex-col gap-2 max-h-60 overflow-auto">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex gap-2 items-center">
            <img
              src={item.thumbnail}
              className="w-10 h-10 rounded object-cover"
             alt={item.title}/>

            <div className="text-xs flex-1">
              <div className="line-clamp-1">{item.title}</div>
              <div className="text-gray-500">
                {item.quantity} × ${item.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/cart"
        className="block mt-3 text-center text-sm border rounded py-1 hover:bg-black hover:text-white"
      >
        Go to cart
      </Link>
    </div>
  )
}
