import { ProductBreadCrumbs } from '@components/product_breadcrumbs'
import { Space } from '@mantine/core'
import React from 'react'

const MainLayout = async ({
  params,
  category,
  item,
}: {
  params: Promise<{ slugs: string[] }>
  category: React.ReactNode
  item: React.ReactNode
}) => {
  const { slugs } = await params

  return (
    <>
      <ProductBreadCrumbs slugs={slugs} />
      <Space h='xl' />
      {(!slugs || slugs.length === 1) && category}
      {slugs && slugs.length > 1 && item}
    </>
  )
}

export default MainLayout
