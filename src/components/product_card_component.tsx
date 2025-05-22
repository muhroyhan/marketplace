import { Card, Center, Container, Image, Text } from '@mantine/core'
import { Product } from '@models/product.model'
import React from 'react'
import { NextLink } from './next_link'
import { CLIENT_PATH } from '@constants/paths'

export const ProductCardComponent = (props: { product: Product }) => {
  return (
    <Card p={0} w={250} h={250}>
      <NextLink
        href={
          CLIENT_PATH.PRODUCT +
          `/${props.product.category.slug}/${props.product.slug}`
        }
      >
        <Center h={200} p={0}>
          <Image h={200} src={props.product.images[0]} fit='cover' />
        </Center>
        <Text>{props.product.title}</Text>
      </NextLink>
    </Card>
  )
}
