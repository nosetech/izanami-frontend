import { Image } from '@/components/atoms'
import { useIsMobileSize } from '@/hooks/useIsMobileSize'
import { Stack, Typography } from '@mui/material'

export type LogoProps = {
  color?: string
  familyName?: string
}

export const Logo = (props: LogoProps) => {
  const { color, familyName } = props
  const isMobileSize = useIsMobileSize()

  const logoSize = { mobile: 20, tablet: 30 }
  const logoFontSize = { mobile: 15, tablet: 20 }

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Image
        src='Icon.svg'
        alt='logo image'
        width={isMobileSize ? logoSize.mobile : logoSize.tablet}
        height={isMobileSize ? logoSize.mobile : logoSize.tablet}
        display='flex'
      />
      <Typography fontSize={logoFontSize} sx={{ color: color }}>
        Chore - XP
      </Typography>
      {familyName && (
        <Typography
          fontSize={logoFontSize}
          sx={{ color: color, fontWeight: 'bold' }}
        >
          ({familyName})
        </Typography>
      )}
    </Stack>
  )
}
