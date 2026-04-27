import { Link } from '@tanstack/react-router'

export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto p-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/chat">Chat</Link>
      </div>
    </header>
  )
}
