/* eslint-disable @next/next/link-passhref */
import { Footer, Header, Metadata } from '@/components'
import { getLanguage } from '@/i18-next'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import { useRouter } from 'next/router'
const listCourse: Array<Course> = []

const About: NextPage = () => {
  const { locale } = useRouter()
  const { overview, btn, home_page } = getLanguage(locale || 'vi')

  return (
    <>
      <Metadata title="Giới thiệu - Ms.Quynh" description="Giới thiệu - Ms.Quynh" />
      <Header />
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="body">
        <h1>Chúng tôi là ai?</h1>
      </div>
      <Footer />
    </>
  )
}

export default About
