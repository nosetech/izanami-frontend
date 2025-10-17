'use client'
import { PrimaryButton } from '@/components/atoms/PrimaryButton'
import {
  HouseWorkCard,
  HouseWorkModal,
  HouseWorkSearch,
} from '@/components/organisms'
import { Housework } from '@/graphql/generated/components'
import { useCurrentUser } from '@/hooks'
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
import { useEffect, useState } from 'react'

export function HouseWorksTemplate() {
  const { currentUser, isLoading: isCurrentUserLoading } = useCurrentUser()
  const {
    isLoading: isHouseWorksLoading,
    getHouseWorksList,
    houseWorksList,
  } = useHouseWorks()
  const [sortType, setSortType] = useState('10')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedHousework, setSelectedHousework] = useState<Housework | null>(
    null,
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

  useEffect(() => {
    if (isCurrentUserLoading == false && currentUser) {
      const sortParams = getSortParams(sortType)
      getHouseWorksList(currentUser.family_id, sortParams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentUserLoading, currentUser, sortType])

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
      getHouseWorksList(currentUser.family_id, sortParams)
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
      <HouseWorkSearch width='600px' />
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
      {/* TODO: 家事一覧の実装 */}
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
      <HouseWorkModal
        open={isModalOpen}
        onClose={handleModalClose}
        housework={selectedHousework}
        isAdmin={isAdmin}
        onSuccess={handleModalSuccess}
      />
    </Stack>
  )
}
