import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import type { Metadata } from 'next'
import { RootProvider } from '@root_provider'

export const metadata: Metadata = {
  title: 'Marketplace App',
  description: 'This is my marketplace app',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='en'>
    <body>
      <RootProvider>{children}</RootProvider>
    </body>
  </html>
)
export default RootLayout
