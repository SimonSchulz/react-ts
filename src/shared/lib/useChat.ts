import { useEffect, useRef, useState } from 'react'
import { CHAT_HTTP_URL, CHAT_WS_URL } from '../config/constants'

type Msg =
  | { kind: 'me'; text: string }
  | { kind: 'bot'; text: string }
  | { kind: 'system'; text: string }

export const useChat = (username: string) => {
  const wsRef = useRef<WebSocket | null>(null)

  const [messages, setMessages] = useState<Msg[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connect = async () => {
    try {
      await fetch(CHAT_HTTP_URL)
      await new Promise((r) => setTimeout(r, 1000))
    } catch {}

    const ws = new WebSocket(CHAT_WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)

      ws.send(
        JSON.stringify({
          type: 'init',
          username
        })
      )
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data.type === 'system') {
        setMessages((p) => [...p, { kind: 'system', text: data.payload.text }])
      }

      if (data.type === 'bot') {
        setIsTyping(false)
        setMessages((p) => [...p, { kind: 'bot', text: data.payload.text }])
      }

      if (data.type === 'typing') {
        setIsTyping(true)
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
    return () => wsRef.current?.close()
  }, [username])

  const sendMessage = (text: string) => {
    if (!wsRef.current || wsRef.current.readyState !== 1) return

    wsRef.current.send(
      JSON.stringify({
        type: 'message',
        text
      })
    )

    setMessages((p) => [...p, { kind: 'me', text }])
  }

  return { messages, sendMessage, isTyping, isConnected }
}
