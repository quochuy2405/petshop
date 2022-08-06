import type { AlertColor } from '@mui/material'

interface Course {
  name: string
  description?: string
  info: string
  address?: string
  type_pet?: string
  pet_code: string
  thumbnail?: string
  image1?: string
  image2?: string
  vol: number
  date_sale?: string
  price: string
}
interface Student {
  name: string
  birth_day: string | number | any
  phone_number: string
  class_code: string | unknown
  email: string
  user_id: string | unknown
  status: number
  created_date: string
}

interface User {
  [x: string]: unknown
  userId: string | null
  name: string | null
  url: string | null
}

interface ImageType {
  alt: string | undefined
  src: string | any
  width?: string | number | undefined
  height?: string | number | undefined
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | 'raw' | undefined
}

interface Notice {
  open: boolean
  message: string
  type: AlertColor
}
export type { Student, Course, User, ImageType, Notice }
