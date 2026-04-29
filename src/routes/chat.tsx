import { useState, useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '../shared/lib/useChat'
import { getUser } from '../shared/lib/user.ts'

export const Route = createFileRoute('/chat')({
  component: ChatPage
})

function ChatPage() {
  const user = getUser()

  const { messages, sendMessage, isTyping, isConnected } = useChat(
    user?.username || 'Guest'
  )

  const [text, setText] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 h-[80vh]">
      <div className="text-sm">
        {isConnected ? (
          <span className="text-green-600">● Connected</span>
        ) : (
          <span className="text-red-500">● Connecting...</span>
        )}
      </div>

      <div className="flex-1 border p-4 overflow-y-auto flex flex-col gap-2">
        {messages.map((m, i) => {
          if (m.kind === 'system') {
            return (
              <div key={i} className="text-center text-sm text-gray-400">
                {m.text}
              </div>
            )
          }

          if (m.kind === 'bot') {
            return (
              <div
                key={i}
                className="self-start bg-gray-100 px-3 py-2 rounded-lg"
              >
                {m.text}
              </div>
            )
          }

          return (
            <div
              key={i}
              className="self-end bg-black text-white px-3 py-2 rounded-lg"
            >
              {m.text}
            </div>
          )
        })}

        {isTyping && (
          <div className="text-xs text-gray-400 self-start">typing...</div>
        )}

        <div ref={ref} />
      </div>

      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()

              if (!text.trim()) return

              sendMessage(text)
              setText('')
            }
          }}
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = 'auto'
            el.style.height = el.scrollHeight + 'px'
          }}
          disabled={!isConnected}
          rows={1}
          className="flex-1 border px-3 py-2 resize-none disabled:opacity-50"
        />

        <button
          onClick={() => {
            if (!text.trim()) return
            sendMessage(text)
            setText('')
          }}
          disabled={!isConnected}
          className="bg-black text-white px-4 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}
