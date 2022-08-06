/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { AppCtx } from '@/Context/GlobalContext'
import { storage } from '@/firebase'
import { getLanguage } from '@/i18-next'
import type { Course as TCourse } from '@/types/interface'
import { Card, CardMedia } from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Styles from './Pet.module.scss'

const link = 'https://i.pinimg.com/564x/4f/37/8c/4f378c256083a7647016baba99716548.jpg'

function Pet({ name, description, thumbnail, info, pet_code, vol, type_pet, price }: TCourse): JSX.Element {
  const router = useRouter()
  const { locale } = router
  const { courses, btn } = getLanguage(locale || 'vi')
  const { user, setLogin } = useContext(AppCtx)
  const [url, setUrl] = useState('')
  useEffect(() => {
    getDownloadURL(ref(storage, `imageProducts/${thumbnail}`))
      .then((url: string) => setUrl(url))
      .catch(() => {
        return ''
      })
  }, [thumbnail])
  const gotoRegister = () => {
    if (user.userId) {
      router.push(`/register-form?classid=${pet_code}`)
    } else {
      setLogin(true)
    }
  }

  return (
    <Card className={Styles.course}>
      <CardMedia component="img" className={Styles.CardImage} image={url || link} alt={name} />

      <div>
        <p className={Styles.title}>{name}</p>
        <p className={Styles.description}>{description}</p>
        <p className={Styles.description}>From: {info}</p>
        <p className={Styles.description}>Type: {type_pet}</p>
        <p className={Styles.description}>Quantity: {vol}</p>
        <p className={Styles.price}>{price} VNĐ</p>
        <div className={Styles.groupBtnPet}>
          <div className={Styles.btnRegister} onClick={() => gotoRegister()}>
            {btn.buy}
          </div>
          <div className={Styles.btnRegister} onClick={() => gotoRegister()}>
            {btn.details}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Pet
