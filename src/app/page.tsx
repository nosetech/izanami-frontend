'use client'
import { useLogin } from '@/hooks/api/useLogin'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, TextField, Typography } from '@mui/material'
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

export default function Page() {
  const router = useRouter()
  const { login, loading } = useLogin()

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

  return (
    <Stack
      height='100lvh'
      justifyContent='center'
      alignItems='center'
      gap='32px'
    >
      <Typography id='login_heading' variant='h1' fontSize='1.5rem'>
        ログインフォーム
      </Typography>
      <Stack
        component='form'
        width={560}
        gap='24px'
        aria-labelledby='login_heading'
      >
        <TextField
          label='メールアドレス'
          required
          autoComplete='email'
          error={'email' in errors}
          helperText={errors.email?.message}
          onKeyDown={onEnter}
          {...register('email')}
        />
        <TextField
          type='password'
          label='パスワード'
          required
          autoComplete='current-password'
          error={'password' in errors}
          helperText={errors.password?.message}
          onKeyDown={onEnter}
          {...register('password')}
        />
        <Button
          type='submit'
          loading={loading}
          variant='contained'
          onClick={handleSubmit(onSubmit)}
        >
          ログイン
        </Button>
      </Stack>
    </Stack>
  )
}
