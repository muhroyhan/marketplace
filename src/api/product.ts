import { useQuery } from '@tanstack/react-query'
import { get } from './api'
import { API_PATH } from '@constants/paths'
import { Product } from '@models/product'

export const useProduct = () => ({
  getBySlug: (slug: string, enabled = true) =>
    useQuery({
      enabled,
      queryKey: ['product', 'slug', slug],
      initialData: <Product>{},
      queryFn: async () => {
        if (!slug) return <Product>{}
        const { data } = await get<Product>(
          API_PATH.PRODUCTS + API_PATH.SLUG + `/${slug}`,
        )
        return data
      },
    }),
  search: (name: string, enabled = true) =>
    useQuery({
      enabled,
      queryKey: ['product', 'search', name],
      initialData: [],
      queryFn: async () => {
        if (!name) return []
        const { data } = await get<Product[]>(API_PATH.PRODUCTS, {
          offset: 0,
          limit: 10,
          title: name,
        })
        return data
      },
    }),
})
