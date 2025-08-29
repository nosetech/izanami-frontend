'use client'

import { GetCurrentUserDocument } from '@/graphql/generated/components'
import { useUserStore } from '@/store'
import { User } from '@/types/api/User'
import { useLazyQuery } from '@apollo/client'
import Cookies from 'js-cookie'
import { useCallback, useEffect } from 'react'

export const useCurrentUser = () => {
  const { currentUser, isLoading, setCurrentUser, setLoading, clearUser } =
    useUserStore()
  const [getCurrentUser] = useLazyQuery(GetCurrentUserDocument)

  const refreshUser = useCallback(async () => {
    setLoading(true)
    try {
      const userCookie = Cookies.get('user')
      if (!userCookie) {
        clearUser()
        return
      }

      const userData: User = JSON.parse(userCookie)

      const { data } = await getCurrentUser({
        variables: { id: userData.id },
      })

      if (data?.user) {
        setCurrentUser({
          ...userData,
          family: data.user.family || undefined,
        })
      } else {
        clearUser()
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      clearUser()
    } finally {
      setLoading(false)
    }
  }, [getCurrentUser, setCurrentUser, setLoading, clearUser])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  return {
    currentUser,
    isLoading,
    refreshUser,
  }
}
