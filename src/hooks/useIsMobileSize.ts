import { useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'

export const useIsMobileSize = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'))
}
