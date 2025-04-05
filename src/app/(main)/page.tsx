import { NextLink } from '@components/next_link'
import { CLIENT_PATH } from '@constants/paths'
import { Button, Center } from '@mantine/core'
import React from 'react'

const Page = () => {
  return (
    <Center>
      <NextLink href={CLIENT_PATH.PRODUCT}>
        <Button>See All Products</Button>
      </NextLink>
    </Center>
  )
}

export default Page
