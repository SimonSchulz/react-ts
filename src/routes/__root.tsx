import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import { Header } from '../shared/ui/Header.tsx'
import { Footer } from '../shared/ui/Footer.tsx'
import { isAuthenticated } from '../shared/lib/auth.ts'
import { LoginModal } from '../shared/ui/LoginModal.tsx'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAuth = isAuthenticated()
    const isPublic = location.pathname === '/'
    if (!isAuth && !isPublic) {
      throw redirect({ to: '/' })
    }
  },
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
