import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace App',
  description: 'This is my marketplace app',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='en'>
    <body>{children}</body>
  </html>
)
export default RootLayout
