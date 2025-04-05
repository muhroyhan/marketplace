import { ProductDetailComponent } from '@components/product_detail_component'
import { Container } from '@mantine/core'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ slugs: string[] }> }) => {
  const { slugs } = await params
  return <ProductDetailComponent slug={slugs[1]} />
}

export default Page
