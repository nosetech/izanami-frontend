import { Image } from '@/components/atoms'
import { useIsMobileSize } from '@/hooks/useIsMobileSize'
import { Stack, Typography, TypographyVariant } from '@mui/material'

export type LogoProps = {
  familyName?: string
}

export const Logo = (props: LogoProps) => {
  const { familyName } = props
  const isMobileSize = useIsMobileSize()

  const logoSize = { mobile: 20, tablet: 30 }
  const logoFont: { mobile: TypographyVariant; tablet: TypographyVariant } = {
    mobile: 'h4',
    tablet: 'h1',
  }

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Image
        src='Icon.svg'
        alt='logo image'
        width={isMobileSize ? logoSize.mobile : logoSize.tablet}
        height={isMobileSize ? logoSize.mobile : logoSize.tablet}
        display='flex'
      />
      {!isMobileSize && (
        <Typography variant={isMobileSize ? logoFont.mobile : logoFont.tablet}>
          Chore - XP
        </Typography>
      )}
      {familyName && (
        <Typography variant={isMobileSize ? logoFont.mobile : logoFont.tablet}>
          {familyName}
        </Typography>
      )}
    </Stack>
  )
}
