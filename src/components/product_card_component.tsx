import { Card, Center, Image } from '@mantine/core'
import { Product } from '@models/product.model'
import React from 'react'
import { NextLink } from './next_link'
import { CLIENT_PATH } from '@constants/paths'

export const ProductCardComponent = (product: Product, key: number) => {
  return (
    <NextLink
      href={CLIENT_PATH.PRODUCT + `/${product.category.slug}/${product.slug}`}
      key={key}
    >
      <Center p={0} w={{ base: '100%' }} h={250}>
        <Image h={200} src={product.images[0]} fit='contain' />
      </Center>
    </NextLink>
  )
}
