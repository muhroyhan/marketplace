import { categoriesQuery } from '@atoms/category'
import { productPaginatedParamAtom } from '@atoms/product'
import {
  Container,
  Flex,
  NumberInput,
  Select,
  Space,
  Text,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { objectFilter } from '@utility/object_filter'
import { useAtom } from 'jotai'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { z } from 'zod'

interface FilterInf {
  categoryId: string
  priceMin: string
  priceMax: string
}

const schema = z.object({
  categoryId: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
})

export const ProductFilterComponent = (props: { isCategoryHide?: boolean }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [{ data: categories }] = useAtom(categoriesQuery)
  const [params, setParams] = useAtom(productPaginatedParamAtom)

  const form = useForm<FilterInf>({
    initialValues: {
      categoryId: searchParams.get('categoryId') || '',
      priceMin: searchParams.get('priceMin') || '',
      priceMax: searchParams.get('priceMax') || '',
    },
    onValuesChange: (values) => {
      const filtered = objectFilter<FilterInf>(values)
      const paramQueries = new URLSearchParams(filtered)
      router.replace(location.pathname + `?${paramQueries.toString()}`)
    },
    validate: zodResolver(schema),
  })

  useEffect(() => {
    const { categorySlug, ...restParams } = params
    let newParams = restParams
    if (searchParams.has('categoryId')) {
      newParams = {
        ...newParams,
        categoryId: Number(searchParams.get('categoryId')),
      }
    }
    if (searchParams.has('priceMin') && searchParams.has('priceMax')) {
      newParams = {
        ...newParams,
        priceMin: Number(searchParams.get('priceMin')),
        priceMax: Number(searchParams.get('priceMax')),
      }
    }
    setParams(newParams)
  }, [
    searchParams.get('categoryId'),
    searchParams.get('priceMin'),
    searchParams.get('priceMax'),
  ])

  return (
    <Flex direction='column' gap='md'>
      <Text size='xl'>Filter</Text>
      {!props.isCategoryHide && (
        <Select
          {...form.getInputProps('categoryId')}
          key={form.key('categoryId')}
          data={categories.map((item) => ({
            label: item.name,
            value: item.id.toString(),
          }))}
          label='Category'
          placeholder='Select Category'
        />
      )}
      <Container p={0} w='100%'>
        <Text size='sm' fw='500'>
          Price Range
        </Text>
        <Flex>
          <NumberInput
            {...form.getInputProps('priceMin')}
            key={form.key('priceMin')}
            w='100%'
          />
          <Space w='md' />
          <Text>-</Text>
          <Space w='md' />
          <NumberInput
            {...form.getInputProps('priceMax')}
            key={form.key('priceMax')}
            w='100%'
          />
        </Flex>
      </Container>
    </Flex>
  )
}
