import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { StrictMode } from 'react'
import './index.css'
import { queryClient } from './shared/app/queryClient.ts'
import { NotFound } from './shared/ui/NotFound.tsx'
const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
