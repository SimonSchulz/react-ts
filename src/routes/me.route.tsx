import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/me')({
  component: lazy(() => import('./me.tsx'))
})
