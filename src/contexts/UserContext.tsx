'use client'

import { GetCurrentUserDocument } from '@/graphql/generated/components'
import { User } from '@/types/api/User'
import { useLazyQuery } from '@apollo/client'
import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'

type UserWithFamily = {
  id: string
  name: string
  email: string
  role: string
  famiy_id: string
  token: string
  family?: {
    id: string
    name: string
  }
}

type UserContextType = {
  currentUser: UserWithFamily | null
  isLoading: boolean
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | null>(null)

type UserProviderProps = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserWithFamily | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [getCurrentUser] = useLazyQuery(GetCurrentUserDocument)

  const refreshUser = async () => {
    setIsLoading(true)
    try {
      const userCookie = Cookies.get('user')
      if (!userCookie) {
        setCurrentUser(null)
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
        setCurrentUser(null)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      setCurrentUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value: UserContextType = {
    currentUser,
    isLoading,
    refreshUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useCurrentUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useCurrentUser must be used within a UserProvider')
  }
  return context
}
