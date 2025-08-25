'use client'
import { FixedAspectImage, Image, PrimaryButton } from '@/components/atoms'
import { useLogin } from '@/hooks/api/useLogin'
import { useIsMobileSize } from '@/hooks/useIsMobileSize'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, TextField, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

type LoginFormInput = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required('入力は必須です。'),
  password: yup.string().required('入力は必須です。'),
})

export function LoginTemplate() {
  const router = useRouter()
  const { login, loading } = useLogin()
  const theme = useTheme()
  const isMobileSize = useIsMobileSize()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      await login(data)
      console.log('ログイン成功')
      router.push('/graphql-client')
    } catch (e) {
      console.error('ログイン失敗', e)
    }
  }

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit({ email: getValues('email'), password: getValues('password') })
    }
  }

  // TODO: ウィンドウ縦サイズを小さくした時に、コンポーネントが重なるのではなく画面スクロールして全体が見えるようにする。
  // TODO: ウィンドウ横サイズを小さくした時に、画像サイズを維持できなくなったら横スクロールバーを出すようにする。
  // モバイルサイズの場合はログインコンポーネントの裏に画像を表示して透けて見えるようにする。
  return (
    <Stack justifyContent='center' alignItems='center' height='100%'>
      <Stack justifyContent='center' direction='row' width='90%'>
        {!isMobileSize && (
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
          p={2}
          width='600px'
          spacing={1}
          alignItems='center'
          sx={{ background: theme.palette.foreground.default }}
        >
          <Image src='Icon.svg' alt='logo image' width={86} height={86} />
          <Typography variant='h3' fontSize={24}>
            Please Login
          </Typography>
          <Stack
            p={3}
            width='100%'
            component='form'
            aria-labelledby='login_interface'
            spacing={3}
          >
            <TextField
              label='email'
              required
              autoComplete='email'
              error={'email' in errors}
              onKeyDown={onEnter}
              {...register('email')}
              sx={{ background: '#FFFFFF' }}
            />
            <TextField
              type='password'
              label='password'
              required
              autoComplete='current-password'
              error={'password' in errors}
              onKeyDown={onEnter}
              {...register('password')}
              sx={{ background: '#FFFFFF' }}
            />
            <PrimaryButton
              type='submit'
              loading={loading}
              variant='contained'
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </PrimaryButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
