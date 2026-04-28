import type { PaginationProps } from '../types/pagination.ts'

export const Pagination = ({
  page,
  total,
  limit,
  onChange
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border rounded ${
            p === page
              ? 'bg-black text-white border-black'
              : 'hover:bg-black hover:text-white'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
