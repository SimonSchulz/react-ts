import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$id')({
  component: lazyRouteComponent(() => import('./product.tsx'))
})
