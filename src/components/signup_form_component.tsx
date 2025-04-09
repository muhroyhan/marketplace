'use client'

import { authLoginMutation } from '@atoms/auth'
import { createUserMutation, emailAvailabilityMutation } from '@atoms/user'
import { LoginResponse } from '@constants/interface/responses'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/keys'
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
import { ResponseCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { z } from 'zod'

interface SignupInf {
  email: string
  name: string
  password: string
  avatar: string
}

const schema = z.object({
  email: z.string().email('Email format invalid'),
  name: z.string({ message: 'Name is Required' }),
  password: z.string().min(8, 'Password min 8 characters'),
})

export const SignupFormComponent = (props: {
  accessToken?: string
  setTokens: (values: LoginResponse) => Promise<void>
}) => {
  const router = useRouter()
  const [{ mutateAsync: checkEmail }] = useAtom(emailAvailabilityMutation)
  const [{ data, mutateAsync: createUser, isPending, isSuccess }] =
    useAtom(createUserMutation)
  const [
    {
      data: loginData,
      mutateAsync: authLogin,
      isPending: isLoadingAuthLogin,
      isSuccess: isSuccessAuthLogin,
    },
  ] = useAtom(authLoginMutation)
  const form = useForm<SignupInf>({
    initialValues: {
      avatar: '',
      email: '',
      name: '',
      password: '',
    },
    validate: zodResolver(schema),
  })

  useEffect(() => {
    if (props.accessToken) router.replace(CLIENT_PATH.HOME)
  }, [props.accessToken])

  useEffect(() => {
    if (!isPending && isSuccess) {
      authLogin({
        email: data.email,
        password: data.password,
      })
    }
  }, [isPending, isSuccess])

  const handleRedirect = async (res: LoginResponse) => {
    await props.setTokens(res)
    router.replace(CLIENT_PATH.WELCOME)
  }

  useEffect(() => {
    if (!isLoadingAuthLogin && isSuccessAuthLogin) {
      handleRedirect(loginData)
    }
  }, [isLoadingAuthLogin, isSuccessAuthLogin])

  const handleSubmit = async (values: SignupInf) => {
    const { isAvailable } = await checkEmail(values.email)

    if (isAvailable) {
      return notifications.show({
        color: 'red',
        message: 'Email already registered',
      })
    }

    createUser({
      ...values,
      avatar: 'https://picsum.photos/200',
      role: 'customer',
    })
  }

  return (
    <Center h='90vh'>
      <Card withBorder w='30%'>
        <Text size='xl' ta='center'>
          Signup
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            label='Email'
            placeholder='Email'
          />
          <TextInput
            {...form.getInputProps('name')}
            key={form.key('name')}
            label='Name'
            placeholder='Name'
          />
          <PasswordInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            label='Password'
            placeholder='Password'
          />
          <Space h='lg' />
          <Button
            loading={isPending || isLoadingAuthLogin}
            type='submit'
            w='100%'
          >
            Signup
          </Button>
          <Space h='lg' />
        </form>
      </Card>
    </Center>
  )
}
