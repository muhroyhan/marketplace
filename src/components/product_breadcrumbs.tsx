'use client'

import { categoryBySlugQuery, categorySlugAtom } from '@atoms/category'
import { productBySlugQuery, productSlugAtom } from '@atoms/product'
import { CLIENT_PATH } from '@constants/paths'
import { Breadcrumbs, Skeleton, Text } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai'
import React, { ReactNode, useEffect, useState } from 'react'
import { NextLink } from './next_link'

interface ProductBreadcrumbInf {
  title: ReactNode | string
  href?: string
}

export const ProductBreadCrumbs = (props: { slugs?: string[] }) => {
  const { slugs } = props
  const [{ data: categorySlugData }] = useAtom(categoryBySlugQuery)
  const [{ data: productSlugData }] = useAtom(productBySlugQuery)
  const setCategorySlug = useSetAtom(categorySlugAtom)
  const setProductSlug = useSetAtom(productSlugAtom)
  const [items, setItems] = useState<ProductBreadcrumbInf[]>([
    { title: 'Home', href: CLIENT_PATH.HOME },
    { title: 'Product' },
  ])

  useEffect(() => {
    if (slugs) {
      if (slugs[1]) {
        setProductSlug(slugs[1])
        setItems([
          { title: 'Home', href: CLIENT_PATH.HOME },
          { title: 'Product', href: CLIENT_PATH.PRODUCT },
          { title: <Skeleton h={20} w={100} /> },
          { title: <Skeleton h={20} w={100} /> },
        ])
      } else {
        setProductSlug('')
        setCategorySlug(slugs[0])
        setItems([
          { title: 'Home', href: CLIENT_PATH.HOME },
          { title: 'Product', href: CLIENT_PATH.PRODUCT },
          { title: <Skeleton h={20} w={100} /> },
        ])
      }
    } else {
      setProductSlug('')
      setCategorySlug('')
      setItems([
        { title: 'Home', href: CLIENT_PATH.HOME },
        { title: 'Product' },
      ])
    }
  }, [JSON.stringify(slugs)])

  useEffect(() => {
    if (categorySlugData?.name) {
      setItems([
        { title: 'Home', href: CLIENT_PATH.HOME },
        { title: 'Product', href: CLIENT_PATH.PRODUCT },
        { title: categorySlugData.name },
      ])
    } else {
      setItems([
        { title: 'Home', href: CLIENT_PATH.HOME },
        { title: 'Product' },
      ])
    }
  }, [categorySlugData?.name])

  useEffect(() => {
    if (productSlugData?.title) {
      setItems([
        { title: 'Home', href: CLIENT_PATH.HOME },
        { title: 'Product', href: CLIENT_PATH.PRODUCT },
        {
          title: productSlugData.category.name,
          href: CLIENT_PATH.PRODUCT + `/${productSlugData.category.slug}`,
        },
        { title: productSlugData.title },
      ])
    } else if (categorySlugData?.name) {
      setItems([
        { title: 'Home', href: CLIENT_PATH.HOME },
        { title: 'Product', href: CLIENT_PATH.PRODUCT },
        { title: categorySlugData.name },
      ])
    } else {
      setItems([
        { title: 'Home', href: CLIENT_PATH.HOME },
        { title: 'Product' },
      ])
    }
  }, [productSlugData?.title])

  return (
    <Breadcrumbs>
      {items.map((item, index) =>
        item.href ? (
          <NextLink href={item.href} key={index}>
            {item.title}
          </NextLink>
        ) : (
          <Text c={'#999999'}>{item.title}</Text>
        ),
      )}
    </Breadcrumbs>
  )
}
