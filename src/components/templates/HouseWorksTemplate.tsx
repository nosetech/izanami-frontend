'use client'
import { PrimaryButton } from '@/components/atoms/PrimaryButton'
import {
  HouseWorkCard,
  HouseWorkModal,
  HouseWorkSearch,
} from '@/components/organisms'
import { Housework, HouseworkFilterInput } from '@/graphql/generated/components'
import {
  useCurrentUser,
  useIntersectionObserver,
  useLocalStorage,
} from '@/hooks'
import { useHouseWorks } from '@/hooks/api/useHouseWorks'
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function HouseWorksTemplate() {
  const { currentUser, isLoading: isCurrentUserLoading } = useCurrentUser()
  const {
    isLoading: isHouseWorksLoading,
    isLoadingMore,
    getHouseWorksList,
    loadMoreHouseWorks,
    houseWorksList,
    hasNextPage,
  } = useHouseWorks()
  const [sortType, setSortType] = useLocalStorage<string>(
    'housework-sort-type',
    '10',
  )
  const [filter, setFilter] = useState<HouseworkFilterInput>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedHousework, setSelectedHousework] = useState<Housework | null>(
    null,
  )

  // 無限スクロール時に次ページを読み込む
  const handleLoadMore = useCallback(() => {
    if (currentUser && hasNextPage && !isLoadingMore && !isHouseWorksLoading) {
      const sortParams = getSortParams(sortType)
      loadMoreHouseWorks(currentUser.family_id, sortParams, filter)
    }
  }, [
    currentUser,
    hasNextPage,
    isLoadingMore,
    isHouseWorksLoading,
    sortType,
    filter,
    loadMoreHouseWorks,
  ])

  // Intersection Observer のオプションを useMemo で保持
  // 毎回同じオブジェクト参照を使用することで observer の再生成を防ぐ
  const intersectionOptions = useMemo(
    () => ({
      threshold: 0.1,
    }),
    [],
  )

  // センチネル要素の ref（画面下部に配置してスクロール検出）
  const sentinelRef = useIntersectionObserver(
    handleLoadMore,
    intersectionOptions,
  )

  // Map sort type to GraphQL sort parameters
  const getSortParams = (sortType: string) => {
    const sortMap: Record<string, { field: string; direction: string }> = {
      '10': { field: 'created_at', direction: 'desc' },
      '20': { field: 'created_at', direction: 'asc' },
      '30': { field: 'updated_at', direction: 'desc' },
      '40': { field: 'updated_at', direction: 'asc' },
      '50': { field: 'point', direction: 'desc' },
      '60': { field: 'point', direction: 'asc' },
    }
    return sortMap[sortType]
  }

  // Handle search filter changes
  const handleSearchChange = (newFilter: HouseworkFilterInput) => {
    setFilter(newFilter)
  }

  useEffect(() => {
    if (isCurrentUserLoading == false && currentUser) {
      const sortParams = getSortParams(sortType)
      getHouseWorksList(currentUser.family_id, sortParams, filter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentUserLoading, currentUser, sortType, filter])

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string)
  }

  const handleCreateClick = () => {
    setSelectedHousework(null)
    setIsModalOpen(true)
  }

  const handleCardClick = (housework: Housework) => {
    setSelectedHousework(housework)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedHousework(null)
  }

  const handleModalSuccess = () => {
    // Reload houseworks list after successful create/update
    if (currentUser) {
      const sortParams = getSortParams(sortType)
      getHouseWorksList(currentUser.family_id, sortParams, filter, true)
    }
  }

  const isAdmin = currentUser?.role === 'admin'

  return (
    <Stack padding={2} spacing={3} alignItems='center'>
      <Typography fontSize='32px' variant='h1'>
        House Work
      </Typography>
      <PrimaryButton size='medium' onClick={handleCreateClick}>
        新しい家事を作成
      </PrimaryButton>
      <HouseWorkSearch width='600px' onSearchChange={handleSearchChange} />
      <Stack
        direction='row'
        width='800px'
        position='relative'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h2'>
          検索結果{houseWorksList?.totalCount ?? 0}件
        </Typography>
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          position='absolute'
          right={0}
        >
          <Typography variant='body1'>並べ替え</Typography>
          <FormControl>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={sortType}
              onChange={handleSortChange}
              size='small'
              sx={{ backgroundColor: '#ffffff' }}
            >
              <MenuItem value={10}>作成日時:近い順</MenuItem>
              <MenuItem value={20}>作成日時:遠い順</MenuItem>
              <MenuItem value={30}>更新日時:近い順</MenuItem>
              <MenuItem value={40}>更新日時:遠い順</MenuItem>
              <MenuItem value={50}>ポイント:高い順</MenuItem>
              <MenuItem value={60}>ポイント:低い順</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      {/* 家事一覧（無限スクロール対応） */}
      {!isHouseWorksLoading && houseWorksList && (
        <Stack
          direction='row'
          justifyContent='center'
          spacing={2}
          useFlexGap
          sx={{ flexWrap: 'wrap' }}
        >
          {(houseWorksList.edges ?? []).map(
            (houseWorkEdge) =>
              houseWorkEdge?.node && (
                <HouseWorkCard
                  key={houseWorkEdge.node.id}
                  housework={houseWorkEdge.node}
                  onClick={() => handleCardClick(houseWorkEdge.node!)}
                />
              ),
          )}
        </Stack>
      )}
      {isHouseWorksLoading && (
        <Stack alignItems='center' justifyContent='center' padding={4}>
          <CircularProgress />
        </Stack>
      )}
      {/* 無限スクロール用センチネル要素 */}
      {!isHouseWorksLoading && hasNextPage && (
        <div ref={sentinelRef} style={{ height: '100px' }}>
          {isLoadingMore && (
            <Stack alignItems='center' justifyContent='center' padding={2}>
              <CircularProgress size={32} />
            </Stack>
          )}
        </div>
      )}
      <HouseWorkModal
        open={isModalOpen}
        onClose={handleModalClose}
        housework={selectedHousework}
        isAdmin={isAdmin}
        onSuccess={handleModalSuccess}
        onDelete={handleModalSuccess}
      />
    </Stack>
  )
}
