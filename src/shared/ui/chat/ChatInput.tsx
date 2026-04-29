import { useState } from 'react'

type Props = {
  onSend: (text: string) => void
  disabled: boolean
}

export const ChatInput = ({ onSend, disabled }: Props) => {
  const [text, setText] = useState('')

  return (
    <div className="p-3 border-t flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!text.trim()) return
            onSend(text)
            setText('')
          }
        }}
        disabled={disabled}
        rows={1}
        className="flex-1 border px-3 py-2 resize-none max-h-32 overflow-y-auto disabled:opacity-50"
      />

      <button
        onClick={() => {
          if (!text.trim()) return
          onSend(text)
          setText('')
        }}
        disabled={disabled}
        className="bg-black text-white px-4 rounded disabled:opacity-50"
      >
        Send
      </button>
    </div>
  )
}
