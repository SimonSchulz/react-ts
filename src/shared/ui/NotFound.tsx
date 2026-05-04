import { Link } from '@tanstack/react-router'

export const NotFound = () => {
  return (
    <div className="p-20 text-center flex flex-col gap-4">
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="text-3xl text-gray-500">Page not found</p>

      <Link to="/" className="underline text-red-500">
        Go home
      </Link>
    </div>
  )
}
