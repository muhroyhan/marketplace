'use client'

import { emailAvailabilityMutation } from '@atoms/user'
import { CLIENT_PATH } from '@constants/paths'
import {
  Alert,
  Button,
  Card,
  Center,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { z } from 'zod'

interface LoginInf {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email('Email format invalid'),
  password: z.string().min(8, 'Password min 8 characters'),
})

export const LoginFormComponent = (props: { accessToken?: string }) => {
  const router = useRouter()
  const [{ mutateAsync: checkEmail }] = useAtom(emailAvailabilityMutation)
  const form = useForm<LoginInf>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(schema),
  })

  useEffect(() => {
    if (props.accessToken) router.replace(CLIENT_PATH.HOME)
  }, [props.accessToken])

  const handleSubmit = async (values: LoginInf) => {
    const { isAvailable } = await checkEmail(values.email)

    if (!isAvailable) {
      return notifications.show({
        color: 'red',
        message: 'User not yet registered',
      })
    }
    console.log(values)
  }

  return (
    <Center h='90vh'>
      <Card withBorder>
        <Text size='xl'>Login and Shop Anywhere</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            label='Email'
            placeholder='Email'
          />
          <PasswordInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            label='Password'
            placeholder='Password'
          />
          <Space h='lg' />
          <Button type='submit' w='100%'>
            Login
          </Button>
          <Space h='lg' />
          <Text>
            Not yet Registered? <Link href={CLIENT_PATH.SIGNUP}>Sign Up</Link>
          </Text>
        </form>
      </Card>
    </Center>
  )
}
