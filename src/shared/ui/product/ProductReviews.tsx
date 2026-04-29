import type { Review } from '../../types/product.ts'

export const ProductReviews = ({ reviews }: { reviews?: Review[] }) => {
  if (!reviews || reviews.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Reviews</h2>

      {reviews.map((r, i) => (
        <div key={i} className="border p-3 rounded-lg text-sm">
          <div className="flex justify-between">
            <span className="font-medium">{r.reviewerName}</span>
            <span>⭐ {r.rating}</span>
          </div>
          <div className="text-gray-600">{r.comment}</div>
        </div>
      ))}
    </div>
  )
}
