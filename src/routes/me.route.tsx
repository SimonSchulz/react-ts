import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/me')({
  component: lazyRouteComponent(() => import('./me.tsx'))
})
