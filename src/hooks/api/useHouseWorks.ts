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
      fetchNetworkOnly: boolean = false,
    ) => {
      setIsLoading(true)
      setEndCursor(null)
      setHasNextPage(false)
      try {
        const { data } = await listHouseWorks({
          variables: {
            familyId: familyId,
            sort: sort,
            filter: filter,
            first: 10,
          },
          fetchPolicy: fetchNetworkOnly ? 'network-only' : 'cache-first',
        })
        const pageInfo = data?.houseworks?.pageInfo
        console.log(
          '[getHouseWorksList] Initial fetch - edges:',
          data?.houseworks?.edges?.length,
          'hasNextPage:',
          pageInfo?.hasNextPage,
          'endCursor:',
          pageInfo?.endCursor,
        )
        setHouseWorksList(data?.houseworks)
        setEndCursor(pageInfo?.endCursor ?? null)
        setHasNextPage(pageInfo?.hasNextPage ?? false)
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
      console.log(
        '[loadMoreHouseWorks] Called with endCursor:',
        endCursor,
        'hasNextPage:',
        hasNextPage,
      )

      if (!endCursor || !hasNextPage) {
        console.log('[loadMoreHouseWorks] Returning early - no more pages')
        return
      }

      setIsLoadingMore(true)
      try {
        console.log(
          '[loadMoreHouseWorks] Fetching next page with after:',
          endCursor,
        )
        const { data } = await listHouseWorks({
          variables: {
            familyId: familyId,
            sort: sort,
            filter: filter,
            first: 10,
            after: endCursor,
          },
        })

        const newEdges = data?.houseworks?.edges ?? []
        console.log(
          '[loadMoreHouseWorks] Fetched',
          newEdges.length,
          'new items',
        )

        // 既存データと新規データを統合
        setHouseWorksList((prevList) => {
          if (!prevList) return data?.houseworks

          const combined = {
            ...data?.houseworks,
            edges: [...(prevList.edges ?? []), ...newEdges],
          }
          console.log(
            '[loadMoreHouseWorks] Total edges after merge:',
            combined.edges?.length,
          )
          return combined
        })

        const newPageInfo = data?.houseworks?.pageInfo
        setEndCursor(newPageInfo?.endCursor ?? null)
        setHasNextPage(newPageInfo?.hasNextPage ?? false)
        console.log(
          '[loadMoreHouseWorks] Next page info - hasNextPage:',
          newPageInfo?.hasNextPage,
          'endCursor:',
          newPageInfo?.endCursor,
        )
      } catch (error) {
        console.error('Failed to load more house works:', error)
      } finally {
        setIsLoadingMore(false)
      }
    },
    [endCursor, hasNextPage, listHouseWorks],
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
