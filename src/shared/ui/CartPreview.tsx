import { useCartStore } from '../store/cart.ts'

export const CartPreview = () => {
  const items = useCartStore((s) => s.items)

  if (items.length === 0) return null

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border bg-white p-3 opacity-0 shadow-lg transition pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
      <div className="flex max-h-60 flex-col gap-2 overflow-auto">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-10 w-10 rounded object-cover"
            />
            <div className="flex-1 text-xs">
              <div className="line-clamp-1">{item.title}</div>
              <div className="text-gray-500">
                {item.quantity} × ${item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
