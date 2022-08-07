/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { AppCtx } from '@/Context/GlobalContext'
import { storage } from '@/firebase'
import { getLanguage } from '@/i18-next'
import type { Course as TCourse } from '@/types/interface'
import { Card, CardMedia } from '@mui/material'
import { style } from '@mui/system'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { Dialog } from '../Dialog'
import Styles from './Pet.module.scss'

const link = 'https://i.pinimg.com/564x/4f/37/8c/4f378c256083a7647016baba99716548.jpg'

function Pet(props: TCourse): JSX.Element {
  const router = useRouter()
  const { locale } = router
  const { btn } = getLanguage(locale || 'vi')
  const { user, setLogin } = useContext(AppCtx)
  const [details, setDetails] = useState(false)
  const [slide, setSlide] = useState(0)

  const [image, setImage] = useState<string[]>([])
  useEffect(() => {
    const imgFileList = [props.thumbnail, props.image1, props.image2]
    const promises = imgFileList.map((file) => {
      const image = getDownloadURL(ref(storage, `imageProducts/${file}`))
      return image
    })
    Promise.all(promises)
      .then((images) => {
        setImage(images)
      })
      .catch((err) => alert(err.code))
    console.log('reder')
  }, [props])

  const gotoRegister = () => {
    if (user.userId) {
      router.push(`/register-form?classid=${props?.pet_code}`)
    } else {
      setLogin(true)
    }
  }

  const clickPrev = () => {
    setSlide((e) => (e - 1 < 0 ? 2 : e - 1))
  }
  const clickNext = () => {
    setSlide((e) => (e + 1 > 2 ? 0 : e + 1))
  }

  return (
    <Card className={Styles.course}>
      <CardMedia component="img" className={Styles.CardImage} image={image[0] || link} alt={props?.name} />
      <Dialog open={details} setOpen={setDetails} title={props?.name}>
        <div style={{ padding: '20px' }}>
          <div className={Styles.slideImage}>
            <FcPrevious className={`${Styles.navSlide} ${Styles.prev}`} onClick={clickPrev} />
            <div className={Styles.boxSlide} style={{ transform: `translate(-${(slide / 3) * 100}%)` }}>
              <CardMedia className={Styles.imageSlide} component="img" image={image[0] || link} alt={props?.name} />
              <CardMedia className={Styles.imageSlide} component="img" image={image[1] || link} alt={props?.name} />
              <CardMedia className={Styles.imageSlide} component="img" image={image[2] || link} alt={props?.name} />
            </div>
            <FcNext className={`${Styles.navSlide} ${Styles.next}`} onClick={clickNext} />
          </div>

          <p className={Styles.title}>{props?.name}</p>
          <p className={Styles.price}>Price: {props?.price} VNĐ</p>
          <p className={Styles.description}>From: {props?.info}</p>
          <p className={Styles.description}>Type: {props?.type_pet}</p>
          <p className={Styles.description}>Quantity: {props?.vol}</p>
          <p className={Styles.description}>Weight: {props?.vol} KG</p>
          <p className={Styles.description}>{props?.description}</p>
        </div>
      </Dialog>
      <div>
        <p className={Styles.title}>{props?.name}</p>
        <p className={Styles.price}>Price: {props?.price} VNĐ</p>
        <p className={Styles.description}>From: {props?.info}</p>
        <p className={Styles.description}>Type: {props?.type_pet}</p>
        <p className={Styles.description}>Quantity: {props?.vol}</p>
        <p className={Styles.description}>Weight: {props?.vol} KG</p>
        <div className={Styles.groupBtnPet}>
          <div className={Styles.btnRegister} onClick={() => gotoRegister()}>
            {btn.buy}
          </div>
          <div className={Styles.btnRegister} onClick={() => setDetails(true)}>
            {btn.details}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Pet
