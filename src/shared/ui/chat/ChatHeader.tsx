type Props = {
  isConnected: boolean
  onClear: () => void
}

export const ChatHeader = ({ isConnected, onClear }: Props) => {
  return (
    <div className="p-3 border-b flex justify-between text-sm">
      {isConnected ? (
        <span className="text-green-600">● Connected</span>
      ) : (
        <span className="text-red-500">● Connecting...</span>
      )}

      <button
        onClick={onClear}
        className="text-xs text-gray-400 hover:text-black"
      >
        Clear
      </button>
    </div>
  )
}
