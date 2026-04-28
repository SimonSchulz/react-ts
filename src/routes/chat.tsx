import { useState, useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '../shared/lib/useChat'

export const Route = createFileRoute('/chat')({
  component: ChatPage
})

function ChatPage() {
  const { messages, sendMessage, sendTyping, isTyping } = useChat('room-1')

  const [text, setText] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 h-[80vh]">
      <div className="flex-1 border p-4 overflow-y-auto flex flex-col gap-2">
        {messages.map((m, i) => {
          if (m.kind === 'system') {
            return (
              <div
                key={i}
                className="bg-gray-200 self-center text-sm px-3 py-2 rounded-lg"
              >
                {m.text}
              </div>
            )
          }

          if (m.kind === 'user') {
            return (
              <div
                key={i}
                className="bg-gray-100 self-start px-3 py-2 rounded-lg max-w-[70%]"
              >
                {m.text}
              </div>
            )
          }

          if (m.kind === 'me') {
            return (
              <div
                key={i}
                className="bg-black text-white self-end px-3 py-2 rounded-lg max-w-[70%]"
              >
                {m.text}
              </div>
            )
          }
          return null
        })}

        {isTyping && <div className="text-xs text-gray-400">typing...</div>}

        <div ref={ref} />
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            sendTyping()
          }}
          className="flex-1 border px-3 py-2"
        />

        <button
          onClick={() => {
            if (!text.trim()) return
            sendMessage(text)
            setText('')
          }}
          className="bg-black text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  )
}
