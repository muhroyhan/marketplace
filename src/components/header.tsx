'use client'

import { productSearchAtom, productSearchQuery } from '@atoms/product'
import { CLIENT_PATH } from '@constants/paths'
import {
  ComboboxLikeRenderOptionInput,
  ComboboxStringItem,
  Flex,
  Text,
} from '@mantine/core'
import { IconBuildingStore, IconHeart, IconUser } from '@tabler/icons-react'
import React from 'react'
import { AutoComplete } from './form/autocomplete'
import { NextLink } from './next_link'
import { useAtom, useSetAtom } from 'jotai'
import { searchDebounce } from '@utility/search_debounce'

export const Header = () => {
  const [{ data }] = useAtom(productSearchQuery)
  const setSearch = useSetAtom(productSearchAtom)

  const renderSearchOption = (
    input: ComboboxLikeRenderOptionInput<ComboboxStringItem>,
  ) => {
    const product = data.find((item) => item.title === input.option.value)
    if (!product) return input.option.value
    return (
      <NextLink
        href={`${CLIENT_PATH.PRODUCT}/${product.category.slug}/${product.slug}`}
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
        onChange={searchDebounce(setSearch, 250)}
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
