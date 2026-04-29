import type { StateProps } from '../types/state.ts'

export const EmptyState = ({
  title = 'Nothing found',
  description = 'Try changing your query',
  actionText,
  onAction
}: StateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-10">
      <div className="text-4xl">🔍</div>

      <div className="text-lg font-medium">{title}</div>

      <div className="text-sm text-gray-500 max-w-xs">{description}</div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 border rounded hover:bg-black hover:text-white transition"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}
