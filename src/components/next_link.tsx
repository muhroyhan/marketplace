import Link from 'next/link'
import React, { forwardRef } from 'react'

export const NextLink: typeof Link = forwardRef((props, ref) => {
  return (
    <Link
      {...props}
      ref={ref}
      style={{ textDecoration: 'none', color: 'inherit' }}
    />
  )
})
