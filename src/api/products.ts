export interface Product {
    id: number
    title: string
    thumbnail: string
    price: string
}

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    return data.products
}