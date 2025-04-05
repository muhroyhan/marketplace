'use client'

import { Carousel } from '@mantine/carousel'
import {
  Center,
  Flex,
  Image,
  Loader,
  SimpleGrid,
  Skeleton,
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

  const renderSkeleton = () => (
    <SimpleGrid cols={2} spacing='xl'>
      <Skeleton h='50vw' w='100%' />
      <Flex direction='column' gap='xl'>
        <Skeleton h={20} w='100%' />
        <Skeleton h={150} w='100%' />
        <SimpleGrid cols={2} spacing={2}>
          <Skeleton h={20} w='100%' />
          <Skeleton h={20} w='100%' />
          <Skeleton h={20} w='100%' />
          <Skeleton h={20} w='100%' />
        </SimpleGrid>
      </Flex>
    </SimpleGrid>
  )

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
      {!data.id && renderSkeleton()}
      {data.id && renderProduct()}
    </Flex>
  )
}

export { ProductDetailComponent }
