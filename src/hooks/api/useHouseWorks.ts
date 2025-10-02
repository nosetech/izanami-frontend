'use client'
import { ListHouseWorksDocument } from '@/graphql/generated/components'
import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'

export const useHouseWorks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listHouseWorks] = useLazyQuery(ListHouseWorksDocument)

  const getHouseWorksList = async (familyId: string, token: string) => {
    setIsLoading(true)
    try {
      const { data } = await listHouseWorks({
        variables: { familyId: familyId },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      })
      console.log('query result data: ', data)
    } catch (error) {
      console.error('Failed to fetch house works:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { getHouseWorksList, isLoading }
}
