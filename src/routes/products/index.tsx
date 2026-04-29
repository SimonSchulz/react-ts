import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/products/')<{
  Search: {
    page?: number
    q?: string
  }
}>({
  validateSearch: (search) => ({
    page: Number(search.page) > 0 ? Number(search.page) : 1,
    q: typeof search.q === 'string' ? search.q : ''
  }),
  component: lazy(() => import('./products'))
})
