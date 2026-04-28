import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/cart')({
  component: lazy(() => import('./cart.tsx'))
})
