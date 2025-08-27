import { FixedAspectImage, Image } from '@/components/atoms'
import { AuthFormInput, AuthInputField } from '@/components/molecules'
import { useIsMobileSize } from '@/hooks/useIsMobileSize'
import { Stack, Typography, useTheme } from '@mui/material'

import { StackProps } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

export type LoginProps = Omit<StackProps, 'onSubmit'> & {
  onSubmit: SubmitHandler<AuthFormInput>
  loading: boolean
}

export const Login = (props: LoginProps) => {
  const { onSubmit, loading, ...stackProps } = props
  const theme = useTheme()

  return (
    <Stack justifyContent='center' direction='row' width='90%' {...stackProps}>
      <FixedAspectImage
        src='/site-image.png'
        alt='site image'
        orgImageWidth={637}
        orgImageHeight={425}
        widthRatio='100%'
        heightRatio='100%'
      />
      <Stack
        p={2}
        width='600px'
        spacing={1}
        alignItems='center'
        sx={{
          backgroundColor: theme.palette.foreground.default,
        }}
      >
        <Image src='Icon.svg' alt='logo image' width={86} height={86} />
        <Typography variant='h3' fontSize={24}>
          Please Login
        </Typography>
        <AuthInputField
          onSubmit={onSubmit}
          loading={loading}
          inputFieldBackgroundColor='#FFFFFF'
          disableHelperText={true}
          p={3}
          width='100%'
          aria-labelledby='login_interface'
          spacing={3}
        />
      </Stack>
    </Stack>
  )
}

export const MinimalLogin = (props: LoginProps) => {
  const { onSubmit, loading, ...stackProps } = props
  const theme = useTheme()
  const isMobileSize = useIsMobileSize()

  return (
    <Stack
      position='relative'
      p={2}
      width='90%'
      maxWidth={isMobileSize ? '460px' : '540px'}
      spacing={isMobileSize ? 8 : 17}
      alignItems='center'
      sx={{
        backgroundColor: 'transparent',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/site-image.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: `${theme.palette.foreground.default}CC`,
          opacity: 0.7,
          zIndex: 2,
        },
        '& > *': {
          position: 'relative',
          zIndex: 3,
        },
      }}
      {...stackProps}
    >
      <Stack alignItems='center'>
        <Image src='Icon.svg' alt='logo image' width={48} height={48} />
        <Typography variant='h3' fontSize={16}>
          Please Login
        </Typography>
      </Stack>
      <AuthInputField
        onSubmit={onSubmit}
        loading={loading}
        size='small'
        inputFieldBackgroundColor='#FFFFFF'
        disableHelperText={true}
        p={2}
        width='100%'
        maxWidth='400px'
        aria-labelledby='login_interface'
        spacing={3}
      />
    </Stack>
  )
}
