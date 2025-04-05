interface PaginationParams {
  offset: number
  limit: number
}

export interface ProductParams extends PaginationParams {
  title?: string
  price?: number
  priceMin?: number
  priceMax?: number
  categoryId?: number
  categorySlug?: string
}
