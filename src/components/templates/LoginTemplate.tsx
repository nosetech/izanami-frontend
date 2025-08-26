'use client'
import { FixedAspectImage, Image } from '@/components/atoms'
import { AuthFormInput, AuthInputField } from '@/components/molecules'
import { useLogin } from '@/hooks/api/useLogin'
import { useIsTabletSize } from '@/hooks/useIsTabletSize'
import { Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'

export function LoginTemplate() {
  const router = useRouter()
  const { login, loading } = useLogin()
  const theme = useTheme()
  const isTabletSize = useIsTabletSize()

  const onSubmit: SubmitHandler<AuthFormInput> = async (data) => {
    try {
      await login({ ...data })
      console.log('ログイン成功')
      router.push('/graphql-client')
    } catch (e) {
      console.error('ログイン失敗', e)
    }
  }

  // TODO: ウィンドウ縦サイズを小さくした時に、コンポーネントが重なるのではなく画面スクロールして全体が見えるようにする。
  // TODO: ウィンドウ横サイズを小さくした時に、画像サイズを維持できなくなったら横スクロールバーを出すようにする。
  // モバイルサイズの場合はログインコンポーネントの裏に画像を表示して透けて見えるようにする。
  return (
    <Stack justifyContent='center' alignItems='center' height='100%'>
      <Stack justifyContent='center' direction='row' width='90%'>
        {!isTabletSize && (
          <FixedAspectImage
            src='/site-image.png'
            alt='site image'
            orgImageWidth={637}
            orgImageHeight={425}
            widthRatio='100%'
            heightRatio='100%'
          />
        )}
        <Stack
          position='relative'
          p={2}
          width='600px'
          spacing={1}
          alignItems='center'
          sx={{
            backgroundColor: 'transparent',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/site-image.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.7,
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
              zIndex: 2,
            },
            '& > *': {
              position: 'relative',
              zIndex: 3,
            },
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
    </Stack>
  )
}
