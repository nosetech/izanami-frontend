'use client'
import {
  HouseworkConnection,
  HouseworkFilterInput,
  HouseworkSortInput,
  ListHouseWorksDocument,
} from '@/graphql/generated/components'
import { useLazyQuery } from '@apollo/client'
import { useCallback, useState } from 'react'

export const useHouseWorks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [houseWorksList, setHouseWorksList] = useState<HouseworkConnection>()
  const [endCursor, setEndCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [listHouseWorks] = useLazyQuery(ListHouseWorksDocument)

  // 初期データ取得（フィルタやソート変更時に呼び出し）
  const getHouseWorksList = useCallback(
    async (
      familyId: string,
      sort?: HouseworkSortInput,
      filter?: HouseworkFilterInput,
    ) => {
      setIsLoading(true)
      setEndCursor(null)
      setHasNextPage(false)
      try {
        const { data } = await listHouseWorks({
          variables: { familyId: familyId, sort: sort, filter: filter },
        })
        setHouseWorksList(data?.houseworks)
        setEndCursor(data?.houseworks?.pageInfo?.endCursor ?? null)
        setHasNextPage(data?.houseworks?.pageInfo?.hasNextPage ?? false)
      } catch (error) {
        console.error('Failed to fetch house works:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [listHouseWorks],
  )

  // 次ページのデータを取得（無限スクロール用）
  const loadMoreHouseWorks = useCallback(
    async (
      familyId: string,
      sort?: HouseworkSortInput,
      filter?: HouseworkFilterInput,
    ) => {
      if (!endCursor || !hasNextPage) return
      if (isLoadingMore) return

      setIsLoadingMore(true)
      try {
        const { data } = await listHouseWorks({
          variables: {
            familyId: familyId,
            sort: sort,
            filter: filter,
            after: endCursor,
          },
        })

        // 既存データと新規データを統合
        setHouseWorksList((prevList) => {
          if (!prevList) return data?.houseworks

          return {
            ...data?.houseworks,
            edges: [
              ...(prevList.edges ?? []),
              ...(data?.houseworks?.edges ?? []),
            ],
          }
        })

        setEndCursor(data?.houseworks?.pageInfo?.endCursor ?? null)
        setHasNextPage(data?.houseworks?.pageInfo?.hasNextPage ?? false)
      } catch (error) {
        console.error('Failed to load more house works:', error)
      } finally {
        setIsLoadingMore(false)
      }
    },
    [endCursor, hasNextPage, isLoadingMore, listHouseWorks],
  )

  return {
    getHouseWorksList,
    loadMoreHouseWorks,
    houseWorksList,
    isLoading,
    isLoadingMore,
    hasNextPage,
  }
}
