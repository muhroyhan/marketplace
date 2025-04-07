'use client'

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from '@theme'
import { Notifications } from '@mantine/notifications'

const queryClient = new QueryClient()

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  )
}
