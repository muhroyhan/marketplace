'use client'

import { CLIENT_PATH } from '@constants/paths'
import { Carousel } from '@mantine/carousel'
import {
  Anchor,
  Flex,
  Image,
  LoadingOverlay,
  SimpleGrid,
  Text,
} from '@mantine/core'
import React, { useEffect } from 'react'
import { productBySlugQuery, productSlugAtom } from '@atoms/product'
import { useAtom, useSetAtom } from 'jotai'

const ProductDetailComponent = (props: { slug: string }) => {
  const [{ data }] = useAtom(productBySlugQuery)
  const setSlug = useSetAtom(productSlugAtom)

  useEffect(() => {
    if (props.slug) setSlug(props.slug)
  }, [])

  const renderProduct = () => (
    <SimpleGrid cols={2} spacing='xl'>
      <Carousel withIndicators>
        {data.images &&
          data.images.map((src, key) => (
            <Carousel.Slide key={key}>
              <Image src={src} fit='contain' />
            </Carousel.Slide>
          ))}
      </Carousel>
      <Flex direction='column' gap='xl'>
        <Text size='xl'>{data.title}</Text>
        <Text size='md'>{data.description}</Text>
        <SimpleGrid cols={2} spacing={2}>
          <Text>Category</Text>
          <Text>{data.category?.name || ''}</Text>
          <Text>Price</Text>
          <Text>${data.price}</Text>
        </SimpleGrid>
      </Flex>
    </SimpleGrid>
  )

  return (
    <Flex direction='column' gap='xl'>
      {renderProduct()}
    </Flex>
  )
}

export { ProductDetailComponent }
