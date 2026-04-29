import { useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '../shared/lib/useChat'
import { getUser } from '../shared/lib/user'
import { ChatHeader } from '../shared/ui/chat/ChatHeader.tsx'
import { ChatMain } from '../shared/ui/chat/ChatMain.tsx'
import { ChatInput } from '../shared/ui/chat/ChatInput.tsx'

export const Route = createFileRoute('/chat')({
  component: ChatPage
})

function ChatPage() {
  const user = getUser()

  const { messages, sendMessage, isTyping, isConnected, clearHistory } =
    useChat(user?.username || 'Guest')
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, isTyping])

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col border rounded-xl bg-white shadow">
        <ChatHeader isConnected={isConnected} onClear={clearHistory} />

        <ChatMain
          messages={messages}
          isTyping={isTyping}
          username={user?.username}
          listRef={listRef}
        />

        <ChatInput onSend={sendMessage} disabled={!isConnected} />
      </div>
    </div>
  )
}
