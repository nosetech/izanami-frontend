import { useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'

export const useIsTabletSize = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))
}
