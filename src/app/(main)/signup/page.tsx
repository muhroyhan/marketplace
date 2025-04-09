import { SignupFormComponent } from '@components/signup_form_component'
import { LoginResponse } from '@constants/interface/responses'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/keys'
import { cookies } from 'next/headers'
import React from 'react'

const Page = async () => {
  const setTokens = async (values: LoginResponse) => {
    'use server'
    const cookieStore = await cookies()
    cookieStore.set(ACCESS_TOKEN_KEY, values.access_token)
    cookieStore.set(REFRESH_TOKEN_KEY, values.refresh_token)
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)

  return (
    <SignupFormComponent
      accessToken={accessToken?.value}
      setTokens={setTokens}
    />
  )
}

export default Page
