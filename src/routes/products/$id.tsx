import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/products/$id')({
  component: lazy(() => import('./product.tsx'))
})
