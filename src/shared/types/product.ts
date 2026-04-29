export type Product = {
  id: string
  title: string
  price: number
  thumbnail: string
  description?: string
  brand?: string
  category?: string
  rating?: number
  stock?: number
  returnPolicy?: string
}
export type ProductResponse = {
  products: Product[]
  total?: number
}
export type ProductFull = {
  id: string
  title: string
  description: string
  price: number

  brand?: string
  category?: string

  rating: number
  stock: number
  availabilityStatus: string

  discountPercentage?: number

  images: string[]
  thumbnail: string

  reviews?: Review[]
}

export type Review = {
  rating: number
  comment: string
  reviewerName: string
}
