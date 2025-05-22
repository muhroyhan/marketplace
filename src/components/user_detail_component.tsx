'use client'

import { accessTokenAtom, authProfileQuery } from '@atoms/auth'
import { CLIENT_PATH } from '@constants/paths'
import { Button, Center, Image } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export const UserDetailComponent = (props: {
  accessToken?: string
  deleteCookie: () => Promise<void>
}) => {
  const router = useRouter()
  const setAccessToken = useSetAtom(accessTokenAtom)
  const [{ data }] = useAtom(authProfileQuery)

  useEffect(() => {
    if (props?.accessToken) setAccessToken(props.accessToken)
  }, [props?.accessToken])

  const handleLogout = async () => {
    await props.deleteCookie()
    router.replace(CLIENT_PATH.HOME)
  }

  return (
    <Center>
      <Button onClick={handleLogout}>Logout</Button>
      <Image src={data.avatar} />
    </Center>
  )
}
