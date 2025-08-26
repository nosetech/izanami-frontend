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

  // TODO: ウィンドウ縦サイズを小さくした時に、コンポーネントが重なるのではなく画面スクロールして全体が見えるようにする。
  // TODO: ウィンドウ横サイズを小さくした時に、画像サイズを維持できなくなったら横スクロールバーを出すようにする。
  // モバイルサイズの場合はログインコンポーネントの裏に画像を表示して透けて見えるようにする。
  return (
    <Stack justifyContent='center' alignItems='center' height='100%'>
      {isTabletSize ? (
        <MinimalLogin onSubmit={onSubmit} loading={loading} />
      ) : (
        <Login onSubmit={onSubmit} loading={loading} />
      )}
    </Stack>
  )
}
