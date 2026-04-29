import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import type { SearchParams } from '../../shared/types/searchParams.ts'

export const Route = createFileRoute('/products/')<{
  search: SearchParams
}>({
  validateSearch: (search) => ({
    page: Number(search.page) > 0 ? Number(search.page) : 1
  }),
  component: lazy(() => import('./products'))
})
