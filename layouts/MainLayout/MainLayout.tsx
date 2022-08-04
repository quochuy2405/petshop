import * as React from 'react'
import { Metadata } from '@/components'

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Metadata title="Learning Code" description="Learning Code - Chia sẽ kiến thức lập trình 😖" />
      {children}
    </>
  )
}

const getMainLayout = (page: JSX.Element) => <MainLayout>{page}</MainLayout>

export default MainLayout
export { getMainLayout }
