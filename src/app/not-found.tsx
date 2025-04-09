import { CLIENT_PATH } from '@constants/paths'
import { Button, Center, Flex, Text } from '@mantine/core'
import { redirect } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  return (
    <Center h='100vh'>
      <Flex direction='column' gap='xl'>
        <Text>Page not found</Text>
        <Button
          onClick={async () => {
            'use server'
            redirect(CLIENT_PATH.HOME)
          }}
        >
          Back Home
        </Button>
      </Flex>
    </Center>
  )
}

export default NotFound
