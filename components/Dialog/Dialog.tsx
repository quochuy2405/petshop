import Styles from '@/components/Dialog/Dialog.module.scss'
import { logoutUser } from '@/firebase'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import type { SetStateAction } from 'react'
import React, { Fragment } from 'react'

interface IDialog {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  children?: React.ReactElement<any, any>
  title?: string
}

export default function DialogDefault({ open, setOpen, children, title }: IDialog): JSX.Element {
  return (
    <Fragment>
      <Dialog open={open} fullWidth>
        <DialogTitle className={Styles.title}>{title || ''}</DialogTitle>

        {children || ''}
        <DialogActions>
          <Button className={Styles.loginGG} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className={Styles.loginFB}
            onClick={() => {
              logoutUser()
              setOpen(false)
            }}
          >
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
