'use client'

import {
  productPaginatedParamAtom,
  productPaginatedQuery,
} from '@atoms/product'
import {
  Card,
  Flex,
  SimpleGrid,
  Container,
  Space,
  Skeleton,
} from '@mantine/core'
import { useAtom } from 'jotai'
import { ProductCardComponent } from './product_card_component'
import { useEffect } from 'react'
import { ProductFilterComponent } from './product_filter_component'
import {
  IconCircleChevronLeft,
  IconCircleChevronRight,
} from '@tabler/icons-react'

export const ProductPaginatedComponent = (props: { slugs?: string[] }) => {
  const [{ data, isFetching }] = useAtom(productPaginatedQuery)
  const [params, setParams] = useAtom(productPaginatedParamAtom)

  useEffect(() => {
    if (props.slugs && props.slugs[0])
      setParams({
        ...params,
        categorySlug: props.slugs[0],
      })
  }, [])

  const handleNext = () => {
    setParams({
      ...params,
      offset: params.offset + params.limit,
    })
  }

  const handlePrevious = () => {
    setParams({
      ...params,
      offset: params.offset - params.limit,
    })
  }

  const renderPagination = () => (
    <Flex justify='right'>
      {params.offset != 0 && (
        <IconCircleChevronLeft size={30} onClick={handlePrevious} />
      )}
      {data.length !== 0 && !(data.length % params.limit) ? (
        <IconCircleChevronRight size={30} onClick={handleNext} />
      ) : (
        <Space w={30} />
      )}
    </Flex>
  )

  return (
    <Flex>
      <Card w='30%'>
        <ProductFilterComponent
          isCategoryHide={props.slugs && !!props.slugs[0]}
        />
      </Card>
      <Container w='70%'>
        {renderPagination()}
        <SimpleGrid cols={3}>
          {!isFetching &&
            data.map((item, key) => ProductCardComponent(item, key))}
          {isFetching &&
            Array(9)
              .keys()
              .map(() => <Skeleton w='100%' h={250} />)}
        </SimpleGrid>
        {renderPagination()}
      </Container>
    </Flex>
  )
}
