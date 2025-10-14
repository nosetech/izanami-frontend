'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type UserWithFamily = {
  id: string
  name: string
  email: string
  role: string
  family_id: string
  token: string
  family?: {
    id: string
    name: string
  }
}

interface UserState {
  currentUser: UserWithFamily | null
  isLoading: boolean
  setCurrentUser: (user: UserWithFamily | null) => void
  setLoading: (loading: boolean) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      currentUser: null,
      isLoading: false,
      setCurrentUser: (user) =>
        set({ currentUser: user }, false, 'setCurrentUser'),
      setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),
      clearUser: () => set({ currentUser: null }, false, 'clearUser'),
    }),
    {
      name: 'user-store',
    },
  ),
)
