import type { PaginationProps } from '../types/pagination.ts'

export const Pagination = ({
  page,
  total,
  limit,
  onChange
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null
  const getPages = () => {
    const raw = [1, page - 1, page, page + 1, totalPages]
    const unique = Array.from(
      new Set(raw.filter((p) => p >= 1 && p <= totalPages))
    ).sort((a, b) => a - b)
    const result: (number | string)[] = []
    for (let i = 0; i < unique.length; i++) {
      if (i > 0 && unique[i] - unique[i - 1] > 1) {
        result.push('...')
      }
      result.push(unique[i])
    }
    return result
  }
  const pages = getPages()

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex sm:hidden items-center gap-4">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm min-w-[80px] text-center tabular-nums">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}-${i}`}
              onClick={() => onChange(+p)}
              className={`px-3 py-1 border rounded min-w-[36px] text-center tabular-nums ${
                p === page
                  ? 'bg-black text-white border-black'
                  : 'hover:bg-black hover:text-white'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
