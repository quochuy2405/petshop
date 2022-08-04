/* eslint-disable @next/next/no-img-element */
import { AccountMenu, Navlink } from '@/components'
import { DialogLogin, DialogLogout } from '@/components/Dialog'
import { AppCtx } from '@/Context/GlobalContext'
import { logoutUser } from '@/firebase'
import { changeLanguage, getLanguage } from '@/i18-next'
import Logo from '@/public/logo.svg'
import type { Notice } from '@/types/interface'
import type { AlertProps, SnackbarOrigin } from '@mui/material'
import { Snackbar, SpeedDialAction } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import SpeedDial from '@mui/material/SpeedDial'
import classnames from 'clsx'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, useContext, useEffect, useState } from 'react'
import { AiOutlineInfoCircle, AiOutlineLogout, AiOutlineShareAlt } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdContacts } from 'react-icons/io'
import { IoBookOutline } from 'react-icons/io5'
import { MdLanguage, MdManageAccounts } from 'react-icons/md'
import { TbLogin } from 'react-icons/tb'
import { TiHomeOutline } from 'react-icons/ti'
import Styles from './Header.module.scss'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />
})

const position: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

function Header(): JSX.Element {
  const { user, setUser, login, setLogin } = useContext(AppCtx)
  const router = useRouter()
  const { locale } = router
  const { navlinks, btn } = getLanguage(locale || 'vi')
  const [onTop, setOnTop] = useState<boolean>(false)
  const [openSpeed, setOpenSpeed] = useState(false)
  const [popUpLogout, setPopUpLogout] = useState(false)
  const handleOpenSpeed = () => setOpenSpeed(true)
  const handleCloseSpeed = () => setOpenSpeed(false)
  const handelLogout = () => {
    setPopUpLogout(true)
  }
  const [notice, setNotice] = useState<Notice>({
    open: false,
    message: '',
    type: 'info'
  })
  const handleCloseNotice = () => setNotice({ ...notice, open: false })
  const handleRedirect = (link: string) => {
    if (router) {
      router.push(link)
    }
    setOpenSpeed(false)
  }
  const links = [
    {
      name: navlinks.ourservice,
      link: '/',
      icon: <TiHomeOutline />
    },
    {
      name: navlinks.aboutus,
      link: '/aboutus',
      icon: <IoBookOutline />
    },
    {
      name: navlinks.petshop,
      link: '/petshop',
      icon: <AiOutlineInfoCircle />
    },
    {
      name: navlinks.foodshop,
      link: '/foodshop',
      icon: <AiOutlineInfoCircle />
    },

    {
      name: navlinks.review,
      link: '/review',
      icon: <AiOutlineInfoCircle />
    },
    {
      name: navlinks.contact,
      link: '/contact',
      icon: <AiOutlineInfoCircle />
    }
  ]

  const actions = [
    {
      view: user.userId ? true : false,
      icon: user.userId && <AiOutlineLogout />,
      name: user.userId && 'Đăng xuất',
      action: user.userId ? () => logoutUser() : void 0
    },
    { view: true, icon: <MdManageAccounts />, name: 'Quản lý khóa học', action: () => handleRedirect('/progress') },
    {
      view: true,
      icon: <MdLanguage />,
      name: 'Chuyển đổi ngôn ngữ',
      action: () => {
        changeLanguage(locale || 'vi', router)
        handleCloseSpeed()
      }
    },
    {
      view: true,
      icon: <AiOutlineShareAlt />,
      name: 'Share',
      action: () => {
        navigator.clipboard.writeText('https://msquynh.vercel.app/')
        setNotice({ message: 'Đã copy link', type: 'success', open: true })
        handleCloseSpeed()
      }
    }
  ]
  useEffect(() => {
    getAuth().onAuthStateChanged((u: any) => {
      if (u) {
        setUser({
          name: u?.displayName,
          url: u?.photoURL,
          userId: u?.uid
        })
      } else {
        setUser({
          name: '',
          url: '',
          userId: ''
        })
      }
    })
  }, [login, setLogin, setUser])

  useEffect(() => {
    window.addEventListener('scroll', () => setOnTop(window.scrollY !== 0))
  }, [])

  return (
    <>
      <Snackbar open={notice.open} anchorOrigin={{ ...position }} autoHideDuration={1400} onClose={handleCloseNotice}>
        <Alert onClose={handleCloseNotice} severity={notice.type || 'info'} sx={{ width: '100%' }}>
          {notice.message || 'Nothing!!!'}
        </Alert>
      </Snackbar>
      <div className={Styles.iconMobile} style={{ position: 'fixed', bottom: 0, right: 16, zIndex: 9999 }}>
        <SpeedDial
          onClose={handleCloseSpeed}
          onOpen={handleOpenSpeed}
          open={openSpeed}
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<GiHamburgerMenu />}
        >
          {actions.map(
            (item) =>
              item.view && (
                <SpeedDialAction
                  onClick={item?.action}
                  key={item.name}
                  tooltipOpen
                  icon={item.icon}
                  tooltipTitle={item.name}
                  style={{ whiteSpace: 'nowrap' }}
                />
              )
          )}
        </SpeedDial>
      </div>

      <div className={classnames(Styles.header, onTop && Styles.onTop)}>
        <DialogLogin open={login} setOpen={setLogin} />
        <DialogLogout open={popUpLogout} setOpen={setPopUpLogout} />
        <div className={Styles.logo}>
          <Link href={'/'} passHref={true}>
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        <div className={Styles.navLinks}>
          {links.map((item) => (
            <Navlink exact key={item.link + item.name} href={item.link} className="link">
              <p className={Styles.linkName}>{item?.name}</p>
              <div className={Styles.iconMobile}>{item?.icon}</div>
            </Navlink>
          ))}
        </div>
        <div className={Styles.btnGroup}>
          {!user.userId ? (
            <div className={classnames(Styles.btnLogin)} onClick={() => setLogin(true)}>
              {/* <TbLogin className={Styles.iconMobile} /> */}
              <p>{btn.login}</p>
            </div>
          ) : (
            <>
              <AccountMenu user={user} />
              <div className={classnames(Styles.iconDestop && Styles.btnRegister)} onClick={() => handelLogout()}>
                <p>{btn.logout}</p>
              </div>
            </>
          )}
          <div className={Styles.btnChangeLang} onClick={() => changeLanguage(locale || 'vi', router)}>
            <p>
              <MdLanguage />
              {btn.changeLang}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
