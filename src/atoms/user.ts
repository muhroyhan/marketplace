import { atom } from 'jotai'
import { atomWithMutation } from 'jotai-tanstack-query'
import { apiPost } from './api'
import { API_PATH } from '@constants/paths'

interface EmailCheck {
  isAvailable: boolean
}

export const emailAvailabilityMutation = atomWithMutation(() => ({
  mutationKey: ['emailAvailability'],
  mutationFn: async (email: string) => {
    const { data } = await apiPost<EmailCheck>(
      API_PATH.USERS + API_PATH.IS_AVAILABLE,
      { email },
    )
    return data
  },
}))
