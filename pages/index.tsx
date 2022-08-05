/* eslint-disable @next/next/link-passhref */
import { Footer, Header, ListPets, Metadata } from '@/components'
import { AppCtx } from '@/Context/GlobalContext'
import { getCourses } from '@/firebase'
import { getLanguage } from '@/i18-next'
import Styles from '@/styles/pages/index.module.scss'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import Image from 'next/image'
import Hero from '@/public/hero.svg'
import Shetland from '@/public/shetland.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const [courses, setCourses] = useState<Array<Course>>()
  const { setLoadingCourse } = useContext(AppCtx)
  const { overview, btn, home_page } = getLanguage(locale || 'vi')
  useEffect(() => {
    setLoadingCourse(false)
    const fetch = async () => {
      const courses: Array<Course> = await getCourses()
      setCourses(courses)
      setLoadingCourse(true)
    }
    fetch()
  }, [])

  return (
    <>
      <Metadata title="Trang chủ - My Pets" description="Trang chủ - My Pets" />
      <Header />
      <div className="body">
        <div className={Styles.overView}>
          <div className={Styles.overViewText}>
            <p className={Styles.overViewTitle}>{overview.title} </p>
            <p className={Styles.overViewDescription}>{overview.description}</p>
            <Link href={'/courses'}>
              <p className={Styles.btnRegister}> {btn.buy}</p>
            </Link>
          </div>
          <div className={Styles.overViewImage}>
            <Image src={Hero} alt={'Hero'} />
          </div>
        </div>

        <div className={Styles.overViewListCourse}>
          <div className={Styles.titleList}>
            <p>{home_page.titleService}</p>
          </div>
          <div className={Styles.serviceCategory}>
            <div className={Styles.service}>
              <Image src={Shetland} alt="service" />
            </div>
            <div className={Styles.service}>
              <Image src={Shetland} alt="service" />
            </div>
            <div className={Styles.service}>
              <Image src={Shetland} alt="service" />
            </div>
            <div className={Styles.service}>
              <Image src={Shetland} alt="service" />
            </div>
            <div className={Styles.service}>
              <Image src={Shetland} alt="service" />
            </div>
          </div>
        </div>
        <div className={Styles.overViewListCourse}>
          <div className={Styles.titleList}>
            <p>{home_page.findTheCourse}</p>
          </div>
          <ListPets size={6} list={courses} />
        </div>
        <div className={Styles.welcome}>
          <div className={Styles.welcomeContent}>
            <p className={Styles.welcomeTitle}>{home_page.developQualityTitle}</p>
            <p className={Styles.welcomeDescription}>{home_page.developQualityDes}</p>
          </div>
          <div className={Styles.imgContent}></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
