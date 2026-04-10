import { useProducts } from '../features/products/useProducts'

export const ProductsPage = () => {
    const { data, isLoading, isError } = useProducts()

    if (isLoading) return <div className="p-6">Loading...</div>
    if (isError) return <div className="p-6 text-red-500">Error</div>

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-3xl font-bold mb-8">Products</h1>

                <div className="
          grid
          gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        ">
                    {data?.map((product) => (
                        <div
                            key={product.id}
                            className="
                bg-white
                rounded-2xl
                shadow-sm
                hover:shadow-lg
                transition
                overflow-hidden
              "
                        >
                            <div className="h-44 bg-gray-100">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="font-semibold text-base mb-2 line-clamp-2">
                                    {product.title}
                                </h2>

                                <p className="text-lg font-bold mb-4">
                                    ${product.price}
                                </p>

                                <button className="
                  w-full
                  bg-black
                  text-white
                  py-2
                  rounded-xl
                  hover:opacity-90
                ">
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}