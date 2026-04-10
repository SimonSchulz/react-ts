import { Link } from '@tanstack/react-router'

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                <Link to="/" className="text-xl font-bold">
                    MyApp
                </Link>

                <nav className="flex gap-6">
                    <Link
                        to="/products"
                        className="text-gray-600 hover:text-black"
                        activeProps={{
                            className: 'text-black font-semibold',
                        }}
                    >
                        Products
                    </Link>
                </nav>

            </div>
        </header>
    )
}