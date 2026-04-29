import type { Msg } from '../../types/message.ts'
import * as React from 'react'
import { ChatProductCard } from '../ChatProductCard.tsx'

type Props = {
  messages: Msg[]
  isTyping: boolean
  username?: string
  listRef: React.RefObject<HTMLDivElement | null>
}

export const ChatMain = ({ messages, isTyping, username, listRef }: Props) => {
  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto p-4 flex flex-col gap-2"
    >
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
            <div key={i} className="self-start max-w-[70%]">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                Support
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-lg">{m.text}</div>
            </div>
          )
        }

        if (m.kind === 'product') {
          return <ChatProductCard key={i} product={m.data} />
        }

        return (
          <div key={i} className="self-end max-w-[70%] text-right">
            <div className="text-xs text-gray-500 mb-1 font-medium">
              {username || 'You'}
            </div>
            <div className="bg-black text-white px-3 py-2 rounded-lg">
              {m.text}
            </div>
          </div>
        )
      })}

      {isTyping && (
        <div className="text-xs text-gray-400 self-start">typing...</div>
      )}
    </div>
  )
}
