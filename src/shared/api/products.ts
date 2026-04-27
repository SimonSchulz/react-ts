import type { Product } from '../types/product'

type Response = {
  products: Product[]
  total: number
}

export const getProducts = async (
  page: number,
  category?: string,
  limit = 16
): Promise<Response> => {
  const skip = (page - 1) * limit

  const base = category
    ? `https://dummyjson.com/products/category/${category}`
    : `https://dummyjson.com/products`

  const res = await fetch(`${base}?limit=${limit}&skip=${skip}`)

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}
