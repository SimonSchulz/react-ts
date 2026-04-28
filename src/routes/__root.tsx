import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Header } from '../shared/ui/Header.tsx'
import { Footer } from '../shared/ui/Footer.tsx'
import { LoginModal } from '../shared/ui/LoginModal.tsx'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4">
        <Outlet />
        <LoginModal />
      </main>
      <Footer />
    </div>
  )
}
