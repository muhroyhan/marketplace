import { atomWithMutation } from 'jotai-tanstack-query'
import { apiPost } from './api'
import { LoginBody } from '@constants/interface/bodies'
import { API_PATH } from '@constants/paths'
import { LoginResponse } from '@constants/interface/responses'

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
