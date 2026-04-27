import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat')({
  component: ChatPage
})

function ChatPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Chat</h1>
    </div>
  )
}
