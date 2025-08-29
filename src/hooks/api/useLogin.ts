import { useCurrentUser } from '@/contexts'
import { useAxios } from '@/hooks/api/axios'
import { User } from '@/types/api/User'
import Cookies from 'js-cookie'

type LoginRequest = {
  email: string
  password: string
}

export const useLogin = () => {
  const { refreshUser } = useCurrentUser()
  const [{ loading }, executePost] = useAxios(
    {
      url: '/session',
      method: 'POST',
    },
    { manual: true },
  )

  const login = async (props: LoginRequest) => {
    await executePost({ data: { ...props } }).then(async (res) => {
      const newUserData: User = { ...res.data }
      Cookies.set('user', JSON.stringify(newUserData), {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      await refreshUser()
    })
  }

  const logout = async () => {
    Cookies.remove('user', { path: '/' })
    await refreshUser()
  }

  return {
    login,
    logout,
    loading,
  }
}
