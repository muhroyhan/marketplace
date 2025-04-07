import { ProductParams } from '@constants/interface/params'
import { apiGet } from './api'
import { API_PATH } from '@constants/paths'
import { Product } from '@models/product.model'
import { atom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'

export const productSearchAtom = atom<string>('')
export const productSearchQuery = atomWithQuery<Product[]>((get) => ({
  initialData: [],
  queryKey: ['productSearch', get(productSearchAtom)],
  queryFn: async () => {
    const search = get(productSearchAtom)
    if (!search) return []
    const { data } = await apiGet<Product[]>(API_PATH.PRODUCTS, {
      offset: 0,
      limit: 10,
      title: search,
    })
    return data
  },
}))

export const productPaginatedParamAtom = atom<ProductParams>({
  offset: 0,
  limit: 10,
})
export const productPaginatedQuery = atomWithQuery<Product[]>((get) => ({
  queryKey: ['productPaginated', get(productPaginatedParamAtom)],
  initialData: [],
  queryFn: async () => {
    const params = get(productPaginatedParamAtom)
    if (isNaN(params.offset) || !params.limit) return []
    const urlParams = new URLSearchParams()
    urlParams.append('offset', params.offset.toString())
    urlParams.append('limit', params.limit.toString())
    if (params.title) urlParams.append('title', params.title)
    if (params.price) urlParams.append('price', params.price.toString())
    if (params.priceMin && params.priceMax) {
      urlParams.append('price_min', params.priceMin.toString())
      urlParams.append('price_max', params.priceMax.toString())
    }
    if (params.categoryId)
      urlParams.append('categoryId', params.categoryId.toString())
    if (params.categorySlug)
      urlParams.append('categorySlug', params.categorySlug)

    const { data } = await apiGet<Product[]>(
      API_PATH.PRODUCTS + `?${urlParams.toString()}`,
    )
    return data
  },
}))

export const productSlugAtom = atom<string>('')
export const productBySlugQuery = atomWithQuery<Product>((get) => ({
  initialData: <Product>{},
  queryKey: ['productBySlug', get(productSlugAtom)],
  queryFn: async () => {
    const slug = get(productSlugAtom)
    if (!slug) return <Product>{}
    const { data } = await apiGet<Product>(
      API_PATH.PRODUCTS + API_PATH.SLUG + `/${slug}`,
    )
    return data
  },
}))
