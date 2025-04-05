'use client'

import {
  productPaginatedParamAtom,
  productPaginatedQuery,
} from '@atoms/product'
import { Flex, SimpleGrid } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai'
import { ProductCardComponent } from './product_card_component'
import { useEffect } from 'react'

export const ProductPaginatedComponent = (props: { slugs?: string[] }) => {
  const [{ data }] = useAtom(productPaginatedQuery)
  const [params, setParams] = useAtom(productPaginatedParamAtom)

  useEffect(() => {
    if (props.slugs && props.slugs[0])
      setParams({
        ...params,
        categorySlug: props.slugs[0],
      })
  }, [])

  return (
    <Flex>
      <SimpleGrid cols={3}>
        {data.map((item, key) => ProductCardComponent(item, key))}
      </SimpleGrid>
    </Flex>
  )
}
