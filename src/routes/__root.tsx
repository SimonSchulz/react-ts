import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Header } from '../shared/ui/Header'
import { Footer } from '../shared/ui/Footer'
import { LoginModal } from '../shared/ui/LoginModal'
import { Suspense } from 'react'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 min-h-[70vh]">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
      <LoginModal />
    </div>
  )
}
