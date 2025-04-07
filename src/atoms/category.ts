import { Category } from '@models/category.model'
import { atom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { apiGet } from './api'
import { API_PATH } from '@constants/paths'

export const categoriesQuery = atomWithQuery<Category[]>((get) => ({
  queryKey: ['categories'],
  initialData: [],
  queryFn: async () => {
    const { data } = await apiGet<Category[]>(API_PATH.CATEGORIES)
    return data
  },
}))

export const categorySlugAtom = atom<string>('')
export const categoryBySlugQuery = atomWithQuery<Category>((get) => ({
  initialData: <Category>{},
  queryKey: ['categoryBySlug', get(categorySlugAtom)],
  queryFn: async () => {
    const slug = get(categorySlugAtom)
    if (!slug) return <Category>{}
    const { data } = await apiGet<Category>(
      API_PATH.CATEGORIES + API_PATH.SLUG + `/${slug}`,
    )
    return data
  },
}))
