'use client'
import {
  HouseworkConnection,
  HouseworkFilterInput,
  HouseworkSortInput,
  ListHouseWorksDocument,
} from '@/graphql/generated/components'
import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'

export const useHouseWorks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [houseWorksList, setHouseWorksList] = useState<HouseworkConnection>()
  const [listHouseWorks] = useLazyQuery(ListHouseWorksDocument)

  const getHouseWorksList = async (
    familyId: string,
    sort?: HouseworkSortInput,
    filter?: HouseworkFilterInput,
  ) => {
    setIsLoading(true)
    try {
      const { data } = await listHouseWorks({
        variables: { familyId: familyId, sort: sort, filter: filter },
      })
      setHouseWorksList(data?.houseworks)
    } catch (error) {
      console.error('Failed to fetch house works:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { getHouseWorksList, houseWorksList, isLoading }
}
