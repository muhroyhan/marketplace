import { ProductDetailComponent } from '@components/product_detail_component'
import { CLIENT_PATH } from '@constants/paths'
import { Anchor, Breadcrumbs, Container } from '@mantine/core'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  return (
    <Container>
      <ProductDetailComponent slug={slug} />
    </Container>
  )
}

export default Page
