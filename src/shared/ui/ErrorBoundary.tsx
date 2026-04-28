import type { ErrorProps } from '../types/errorProps.ts'

export const ErrorBoundary = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className="text-center mt-10">
      <p className="text-red-500 mb-3">{message || 'Something went wrong'}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="border px-3 py-1 rounded hover:bg-black hover:text-white"
        >
          Retry
        </button>
      )}
    </div>
  )
}
