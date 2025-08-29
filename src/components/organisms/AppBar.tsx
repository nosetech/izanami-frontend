import { useCurrentUser } from '@/hooks'
import { useIsMobileSize } from '@/hooks/useIsMobileSize'
import { Menu as MenuIcon } from '@mui/icons-material'
import {
  IconButton,
  AppBar as MuiAppBar,
  Stack,
  Toolbar,
  Typography,
  TypographyVariant,
  useTheme,
} from '@mui/material'

import { Logo } from '@/components/organisms'

export const AppBar = () => {
  const theme = useTheme()
  const isMobileSize = useIsMobileSize()
  const { currentUser, isLoading } = useCurrentUser()

  const appBarHeight = { mobile: '25px', tablet: '32px' }
  const fontVariant: { mobile: TypographyVariant; tablet: TypographyVariant } =
  {
    mobile: 'h4',
    tablet: 'h1',
  }

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
          <Logo familyName={currentUser?.family?.name} />

          {!isLoading && currentUser && (
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography
                variant={isMobileSize ? fontVariant.mobile : fontVariant.tablet}
              >
                {currentUser.name}
              </Typography>
              <IconButton
                size={isMobileSize ? 'small' : 'medium'}
                edge='end'
                color='inherit'
                aria-label='menu'
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
