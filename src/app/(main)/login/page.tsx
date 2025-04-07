import { LoginFormComponent } from '@components/login_form_component'
import { ACCESS_TOKEN_KEY } from '@constants/keys'
import { cookies } from 'next/headers'
import React from 'react'

const Page = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)

  return <LoginFormComponent accessToken={accessToken?.value} />
}

export default Page
