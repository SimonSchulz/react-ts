import { useEffect, useRef, useState } from 'react'
import { CHAT_HTTP_URL, CHAT_WS_URL } from '../config/constants.ts'
import type { ServerMsg, ChatMsg } from '../types/message.ts'

export const useChat = (roomId: string) => {
  const wsRef = useRef<WebSocket | null>(null)

  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connect = async () => {
    try {
      await fetch(CHAT_HTTP_URL)
      await new Promise((r) => setTimeout(r, 1500))
    } catch (e) {
      console.error(e)
    }

    const ws = new WebSocket(CHAT_WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)

      ws.send(
        JSON.stringify({
          type: 'join',
          roomId
        })
      )
    }

    ws.onmessage = (e) => {
      try {
        const data: ServerMsg = JSON.parse(e.data)

        if (data.type === 'system') {
          setMessages((p) => [
            ...p,
            { kind: 'system', text: data.payload.text }
          ])
        }

        if (data.type === 'message') {
          setMessages((p) => [
            ...p,
            {
              kind: 'user',
              text: data.payload.text,
              user: data.payload.user
            }
          ])
        }

        if (data.type === 'typing') {
          setIsTyping(true)
          setTimeout(() => setIsTyping(false), 800)
        }
      } catch (e) {
        console.error(e)
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      setTimeout(connect, 2000)
    }

    ws.onerror = () => ws.close()
  }

  useEffect(() => {
    connect()

    const ping = setInterval(
      () => {
        fetch(CHAT_HTTP_URL).catch(() => {})
      },
      5 * 60 * 1000
    )

    return () => {
      wsRef.current?.close()
      clearInterval(ping)
    }
  }, [roomId])

  const sendMessage = (text: string) => {
    if (!wsRef.current || wsRef.current.readyState !== 1) return

    wsRef.current.send(
      JSON.stringify({
        type: 'message',
        text
      })
    )
  }

  const sendTyping = () => {
    wsRef.current?.send(
      JSON.stringify({
        type: 'typing'
      })
    )
  }

  return { messages, sendMessage, sendTyping, isTyping, isConnected }
}
