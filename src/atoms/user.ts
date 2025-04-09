import { atom } from 'jotai'
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query'
import { apiGet, apiPost } from './api'
import { API_PATH } from '@constants/paths'
import { User } from '@models/user.model'

interface EmailCheck {
  isAvailable: boolean
}

export const emailAvailabilityMutation = atomWithMutation<EmailCheck, string>(
  () => ({
    mutationKey: ['emailAvailability'],
    mutationFn: async (email) => {
      const { data } = await apiPost<EmailCheck>(
        API_PATH.USERS + API_PATH.IS_AVAILABLE,
        { email },
      )
      return data
    },
  }),
)

export const createUserMutation = atomWithMutation<User, Omit<User, 'id'>>(
  () => ({
    initialData: <User>{},
    mutationKey: ['createUser'],
    mutationFn: async (body) => {
      const { data } = await apiPost<User>(API_PATH.USERS, { ...body })
      return data
    },
  }),
)

export const userIdAtom = atom<number>()
export const userQuery = atomWithQuery<User>((get) => ({
  initialData: <User>{},
  queryKey: ['user', get(userIdAtom)],
  queryFn: async () => {
    const id = get(userIdAtom)
    if (!id) return <User>{}
    const { data } = await apiGet<User>(API_PATH.USERS + `/${id}`)
    return data
  },
}))
