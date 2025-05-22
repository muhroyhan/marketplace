import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query'
import { apiGet, apiPost } from './api'
import { LoginBody } from '@constants/interface/bodies'
import { API_PATH } from '@constants/paths'
import { LoginResponse } from '@constants/interface/responses'
import { User } from '@models/user.model'
import { atom } from 'jotai'
import { AxiosHeaders } from 'axios'

export const authLoginMutation = atomWithMutation<LoginResponse, LoginBody>(
  () => ({
    mutationKey: ['authLogin'],
    mutationFn: async (body) => {
      const { data } = await apiPost<LoginResponse>(
        API_PATH.AUTH + API_PATH.LOGIN,
        { ...body },
      )
      return data
    },
  }),
)

export const accessTokenAtom = atom<string>()
export const authProfileQuery = atomWithQuery<User>((get) => ({
  enabled: !!get(accessTokenAtom),
  initialData: <User>{},
  queryKey: ['authProfile'],
  queryFn: async () => {
    const { data } = await apiGet<User>(
      API_PATH.AUTH + API_PATH.PROFILE,
      {},
      new AxiosHeaders({
        Authorization: `Bearer ${get(accessTokenAtom)}`,
      }),
    )
    return data
  },
}))
