'use client'
import { AuthFormInput } from '@/components/molecules'
import { Login, MinimalLogin } from '@/components/organisms'
import { useLogin } from '@/hooks/api/useLogin'
import { useIsTabletSize } from '@/hooks/useIsTabletSize'
import { Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

export function LoginTemplate() {
  const router = useRouter()
  const { login, loading } = useLogin()
  const isTabletSize = useIsTabletSize()

  const onSubmit: SubmitHandler<AuthFormInput> = async (data) => {
    try {
      await login({ ...data })

      console.log('ログインしました。')
      toast.success('ログインしました。')
      router.push('/mypage')
    } catch (e) {
      console.error('ログインに失敗しました。', e)
      toast.error('ログインに失敗しました。')
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
