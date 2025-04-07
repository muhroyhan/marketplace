import { Footer } from '@components/footer'
import { Header } from '@components/header'
import { ACCESS_TOKEN_KEY } from '@constants/keys'
import { cookies } from 'next/headers'
import React from 'react'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)
  return (
    <>
      <Header accessToken={accessToken?.value} />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
