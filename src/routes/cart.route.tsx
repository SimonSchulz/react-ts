import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/cart')({
  component: lazyRouteComponent(() => import('./cart.tsx'))
})
