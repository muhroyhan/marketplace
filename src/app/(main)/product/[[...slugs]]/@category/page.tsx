import { ProductPaginatedComponent } from '@components/product_paginated_component'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ slugs: string[] }> }) => {
  const { slugs } = await params

  return <ProductPaginatedComponent slugs={slugs} />
}

export default Page
