export const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-lg" />

      <div className="flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="mt-auto h-10 bg-gray-200 rounded" />
    </div>
  )
}
