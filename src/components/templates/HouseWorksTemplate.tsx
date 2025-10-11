'use client'
import { PrimaryButton } from '@/components/atoms/PrimaryButton'
import { HouseWorkCard, HouseWorkSearch } from '@/components/organisms'
import { useCurrentUser } from '@/hooks'
import { useHouseWorks } from '@/hooks/api/useHouseWorks'
import {
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

  useEffect(() => {
    if (isCurrentUserLoading == false && currentUser) {
      getHouseWorksList(currentUser.family_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentUserLoading, currentUser])

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string)
  }

  return (
    <Stack padding={2} spacing={1} alignItems='center'>
      <Typography fontSize='32px' variant='h1'>
        House Work
      </Typography>
      {/* TODO: ボタン押下で家事入力モーダル画面を表示する */}
      <PrimaryButton size='medium'>新しい家事を作成</PrimaryButton>
      <HouseWorkSearch />
      {/* TODO: ソート機能の実装 */}
      <Stack direction='row' spacing={1} alignItems='center'>
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
            <MenuItem value={10}>作成日時:早い順</MenuItem>
            <MenuItem value={20}>作成日時:遅い順</MenuItem>
            <MenuItem value={30}>更新日時:早い順</MenuItem>
            <MenuItem value={40}>更新日時:遅い順</MenuItem>
            <MenuItem value={50}>ポイント:高い順</MenuItem>
            <MenuItem value={60}>ポイント:低い順</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* TODO: 検索結果表示の実装 */}
      <Typography variant='body1'>
        検索結果{houseWorksList?.totalCount ?? 0}件
      </Typography>
      {/* TODO: 家事一覧の実装 */}
      {isHouseWorksLoading == false && houseWorksList && (
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
                />
              ),
          )}
        </Stack>
      )}
    </Stack>
  )
}
