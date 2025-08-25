import { useIsMobileSize } from '@/hooks/useIsMobileSize'
import { AppBar as MuiAppBar, Stack, Toolbar, useTheme } from '@mui/material'

import { Logo } from '@/components/organisms'

export type AppBarProps = {
  color?: string
}

export const AppBar = (props: AppBarProps) => {
  const { color } = props
  const theme = useTheme()
  const isMobileSize = useIsMobileSize()

  const appBarHeight = { mobile: '25px', tablet: '32px' }

  return (
    <MuiAppBar
      position='static'
      sx={{
        backgroundColor: theme.palette.foreground.default,
      }}
    >
      <Toolbar
        sx={{
          minHeight: isMobileSize ? appBarHeight.mobile : appBarHeight.tablet,
        }}
      >
        <Stack width='100%'>
          <Logo color={color} />
        </Stack>
      </Toolbar>
    </MuiAppBar>
  )
}
