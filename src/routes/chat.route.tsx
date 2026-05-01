import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/chat')({
  component: lazy(() => import('./chat.tsx'))
})
