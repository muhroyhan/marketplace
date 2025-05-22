import { UserDetailComponent } from '@components/user_detail_component'
import { ACCESS_TOKEN_KEY } from '@constants/keys'
import { cookies } from 'next/headers'
import React from 'react'

const Page = async () => {
  const handleDeleteCookie = async () => {
    'use server'

    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_TOKEN_KEY)
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)

  return (
    <UserDetailComponent
      accessToken={accessToken?.value}
      deleteCookie={handleDeleteCookie}
    />
  )
}

export default Page
