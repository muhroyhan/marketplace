'use client'

import {
  productPaginatedParamAtom,
  productPaginatedQuery,
} from '@atoms/product'
import { Card, Flex, SimpleGrid, Container, Pagination } from '@mantine/core'
import { useAtom } from 'jotai'
import { ProductCardComponent } from './product_card_component'
import { useEffect } from 'react'
import { ProductFilterComponent } from './product_filter_component'

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
      <Card w='30%'>
        <ProductFilterComponent
          isCategoryHide={props.slugs && !!props.slugs[0]}
        />
      </Card>
      <SimpleGrid cols={3} w='70%'>
        {data.map((item, key) => ProductCardComponent(item, key))}
      </SimpleGrid>
    </Flex>
  )
}
