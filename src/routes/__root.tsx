import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Header } from '../shared/ui/Header.tsx'
import { Footer } from '../shared/ui/Footer.tsx'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
