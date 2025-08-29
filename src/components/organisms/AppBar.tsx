import { useCurrentUser } from '@/hooks'
import { useIsMobileSize } from '@/hooks/useIsMobileSize'
import { Menu as MenuIcon } from '@mui/icons-material'
import {
  IconButton,
  AppBar as MuiAppBar,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'

import { Logo } from '@/components/organisms'

export type AppBarProps = {
  color?: string
}

export const AppBar = (props: AppBarProps) => {
  const { color } = props
  const theme = useTheme()
  const isMobileSize = useIsMobileSize()
  const { currentUser, isLoading } = useCurrentUser()

  const appBarHeight = { mobile: '25px', tablet: '32px' }
  const fontSize = { mobile: 12, tablet: 16 }

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
        <Stack
          width='100%'
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Logo color={color} familyName={currentUser?.family?.name} />

          {!isLoading && currentUser && (
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography
                fontSize={isMobileSize ? fontSize.mobile : fontSize.tablet}
                sx={{ color: color }}
              >
                {currentUser.name}
              </Typography>
              <IconButton
                size={isMobileSize ? 'small' : 'medium'}
                edge='end'
                color='inherit'
                aria-label='menu'
                sx={{ color: color }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </MuiAppBar>
  )
}
