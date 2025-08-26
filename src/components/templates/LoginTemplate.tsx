'use client'
import { AuthFormInput } from '@/components/molecules'
import { Login, MinimalLogin } from '@/components/organisms'
import { useLogin } from '@/hooks/api/useLogin'
import { useIsTabletSize } from '@/hooks/useIsTabletSize'
import { Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'

export function LoginTemplate() {
  const router = useRouter()
  const { login, loading } = useLogin()
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

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      height='100%'
      minHeight='500px'
      sx={{
        pt: 5,
        pb: 5,
      }}
    >
      {isTabletSize ? (
        <MinimalLogin onSubmit={onSubmit} loading={loading} />
      ) : (
        <Login onSubmit={onSubmit} loading={loading} />
      )}
    </Stack>
  )
}
