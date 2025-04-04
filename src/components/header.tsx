'use client'

import { useProduct } from '@api/product'
import { CLIENT_PATH } from '@constants/paths'
import {
  ComboboxLikeRenderOptionInput,
  ComboboxStringItem,
  Flex,
  Text,
} from '@mantine/core'
import { IconBuildingStore, IconHeart, IconUser } from '@tabler/icons-react'
import React, { useState } from 'react'
import { AutoComplete } from './form/autocomplete'
import { NextLink } from './next_link'

export const Header = () => {
  const productApi = useProduct()
  const [search, setSearch] = useState<string>('')

  const { data } = productApi.search(search)

  const renderSearchOption = (
    input: ComboboxLikeRenderOptionInput<ComboboxStringItem>,
  ) => {
    const product = data.find((item) => item.title === input.option.value)
    if (!product) return input.option.value
    return (
      <NextLink
        href={`${CLIENT_PATH.PRODUCT}/${product.slug}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Text w='100%' p={10}>
          {input.option.value}
        </Text>
      </NextLink>
    )
  }

  return (
    <Flex gap={10} p={10}>
      <NextLink href={CLIENT_PATH.HOME}>
        <IconBuildingStore size={40} />
      </NextLink>
      <AutoComplete
        w='100%'
        onChange={setSearch}
        data={data.map((item) => item.title)}
        renderOption={renderSearchOption}
      />
      <NextLink href={CLIENT_PATH.WISHLIST}>
        <IconHeart size={40} />
      </NextLink>
      <NextLink href={CLIENT_PATH.USER}>
        <IconUser size={40} />
      </NextLink>
    </Flex>
  )
}
