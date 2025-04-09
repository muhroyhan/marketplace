import { UserDetailComponent } from '@components/user_detail_component'
import { ACCESS_TOKEN_KEY } from '@constants/keys'
import { cookies } from 'next/headers'
import React from 'react'

const Page = () => {
  const handleDeleteCookie = async () => {
    'use server'

    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_TOKEN_KEY)
  }

  return <UserDetailComponent deleteCookie={handleDeleteCookie} />
}

export default Page
