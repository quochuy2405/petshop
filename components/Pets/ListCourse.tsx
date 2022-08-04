/* eslint-disable prefer-spread */
import { AppCtx } from '@/Context/GlobalContext'
import type { Course as TCourse } from '@/types/interface'
import { Box, Skeleton } from '@mui/material'
import { useContext } from 'react'
import Pet from './Pet'
import Styles from './ListCourse.module.scss'

interface Courses {
  size?: number
  list?: Array<TCourse>
}

function ListCourse({ size, list }: Courses): JSX.Element {
  const { loadingCourse } = useContext(AppCtx)
  return (
    <div className={Styles.listCourse}>
      {!loadingCourse
        ? Array.apply(null, Array(3)).map((item, index) => (
            <Box key={Date.now() + index}>
              <Skeleton variant="rectangular" width={345} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          ))
        : list?.slice(0, size)?.map((item) => <Pet {...item} key={item.name + item.description} />)}
    </div>
  )
}

export default ListCourse
