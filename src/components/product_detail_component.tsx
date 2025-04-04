'use client'

import { useProduct } from '@api/product'
import { CLIENT_PATH } from '@constants/paths'
import { Carousel } from '@mantine/carousel'
import {
  Anchor,
  Breadcrumbs,
  Container,
  Flex,
  Grid,
  Image,
  LoadingOverlay,
  SimpleGrid,
  Text,
} from '@mantine/core'
import React from 'react'

const ProductDetailComponent = (props: { slug: string }) => {
  const { slug } = props
  const productApi = useProduct()
  const { data, isLoading } = productApi.getBySlug(slug)

  const items = [
    { title: 'Home', href: CLIENT_PATH.HOME },
    { title: 'Product', href: CLIENT_PATH.PRODUCT },
    { title: data.title },
  ].map((item, index) =>
    item.href ? (
      <Anchor href={item.href} key={index}>
        {item.title}
      </Anchor>
    ) : (
      item.title
    ),
  )

  const renderProduct = () => (
    <SimpleGrid cols={2} spacing='xl'>
      <Carousel withIndicators>
        {data.images &&
          data.images.map((src) => (
            <Carousel.Slide>
              <Image src={src} fit='contain' />
            </Carousel.Slide>
          ))}
      </Carousel>
      <Flex direction='column' gap='xl'>
        <Text size='xl'>{data.title}</Text>
        <Text size='md'>{data.description}</Text>
        <SimpleGrid cols={2} spacing={2}>
          <Text>Category</Text>
          <Text>{data.category.name}</Text>
          <Text>Price</Text>
          <Text>${data.price}</Text>
        </SimpleGrid>
      </Flex>
    </SimpleGrid>
  )

  return (
    <Flex direction='column' gap='xl'>
      <Breadcrumbs>{items}</Breadcrumbs>
      {isLoading && <LoadingOverlay />}
      {!isLoading && renderProduct()}
    </Flex>
  )
}

export { ProductDetailComponent }
