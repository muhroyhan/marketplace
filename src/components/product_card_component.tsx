import { Card, Image } from '@mantine/core'
import { Product } from '@models/product'
import React from 'react'
import { NextLink } from './next_link'
import { CLIENT_PATH } from '@constants/paths'

export const ProductCardComponent = (product: Product, key: number) => {
  return (
    <NextLink
      href={CLIENT_PATH.PRODUCT + `/${product.category.slug}/${product.slug}`}
      key={key}
    >
      <Card p={0}>
        <Image src={product.images[0]} />
      </Card>
    </NextLink>
  )
}
