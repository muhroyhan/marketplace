'use client'

import { CLIENT_PATH } from '@constants/paths'
import { Button, Center } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React from 'react'

export const UserDetailComponent = (props: {
  deleteCookie: () => Promise<void>
}) => {
  const router = useRouter()
  const handleLogout = async () => {
    await props.deleteCookie()
    router.replace(CLIENT_PATH.HOME)
  }

  return (
    <Center>
      <Button onClick={handleLogout}>Logout</Button>
    </Center>
  )
}
