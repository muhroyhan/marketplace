'use client'

import { categoryBySlugQuery, categorySlugAtom } from '@atoms/category'
import { productBySlugQuery, productSlugAtom } from '@atoms/product'
import { CLIENT_PATH } from '@constants/paths'
import { Anchor, Breadcrumbs } from '@mantine/core'
import { useAtom, useSetAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

export const ProductBreadCrumbs = (props: { slugs?: string[] }) => {
  const { slugs } = props
  const [{ data: categorySlugData }] = useAtom(categoryBySlugQuery)
  const [{ data: productSlugData }] = useAtom(productBySlugQuery)
  const setCategorySlug = useSetAtom(categorySlugAtom)
  const setProductSlug = useSetAtom(productSlugAtom)
  const [items, setItems] = useState<{ title: string; href?: string }[]>([
    { title: 'Home', href: CLIENT_PATH.HOME },
    { title: 'Product' },
  ])

  useEffect(() => {
    if (slugs) {
      if (slugs[1]) setProductSlug(slugs[1])
      else setCategorySlug(slugs[0])
    }
  }, [])

  useEffect(() => {
    if (categorySlugData?.name) {
      setItems([
        { title: 'Home', href: CLIENT_PATH.HOME },
        { title: 'Product', href: CLIENT_PATH.PRODUCT },
        { title: categorySlugData.name },
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
    }
  }, [productSlugData?.title])

  return (
    <Breadcrumbs>
      {items.map((item, index) =>
        item.href ? (
          <Anchor href={item.href} key={index}>
            {item.title}
          </Anchor>
        ) : (
          item.title
        ),
      )}
    </Breadcrumbs>
  )
}
