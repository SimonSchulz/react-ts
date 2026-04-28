import { Link } from '@tanstack/react-router'

export const NotFound = () => {
  return (
    <div className="p-10 text-center flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-gray-500">Page not found</p>

      <Link to="/" className="underline">
        Go home
      </Link>
    </div>
  )
}
