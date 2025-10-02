'use client'

import { TextButton } from '@/components/atoms'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  StackProps,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'

export type HouseWorkSearchProps = StackProps

export const HouseWorkSearch = (props: HouseWorkSearchProps) => {
  const theme = useTheme()
  const [category, setCategory] = useState<string[]>([])

  const handleCategory = (
    _event: React.MouseEvent<HTMLElement>,
    newCategorys: string[],
  ) => {
    setCategory(newCategorys)
  }

  return (
    <Stack>
      <Typography variant='body1'>絞り込み</Typography>
      <Stack display='flex' direction='row' alignItems='end'>
        {/* TODO: 検索コンポーネントの実装*/}
        {/* TODO: 検索条件の項目名と入力コンポーネントは4行2列のマトリックス上に配置する。*/}
        <Stack p={1} px={2} spacing={1}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body1'>キーワード</Typography>
            <TextField
              size='small'
              sx={{ background: '#ffffff', width: '400px' }}
            />
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body1'>カテゴリ</Typography>
            <ToggleButtonGroup
              value={category}
              onChange={handleCategory}
              aria-label='category'
              size='small'
            >
              <ToggleButton
                value='cooking'
                aria-label='coking'
                color='info'
                sx={{
                  width: '70px',
                  backgroundColor: '#ffffff',
                  '&:hover': { backgroundColor: theme.palette.base.bright },
                }}
              >
                料理
              </ToggleButton>
              <ToggleButton
                value='cleaning'
                aria-label='cleaning'
                sx={{ width: '70px' }}
              >
                掃除
              </ToggleButton>
              <ToggleButton
                value='shopping'
                aria-label='shopping'
                sx={{ width: '70px' }}
              >
                買い物
              </ToggleButton>
              <ToggleButton
                value='laundry'
                aria-label='laundry'
                sx={{ width: '70px' }}
              >
                洗濯
              </ToggleButton>
              <ToggleButton
                value='other'
                aria-label='other'
                sx={{ width: '70px' }}
              >
                その他
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body1'>ポイント</Typography>
            <TextField
              type='number'
              size='small'
              inputProps={{
                min: 0,
              }}
              sx={{ background: '#ffffff', width: '100px' }}
            />
            <Typography variant='body1'>〜</Typography>
            <TextField
              type='number'
              size='small'
              inputProps={{
                min: 0,
              }}
              sx={{ background: '#ffffff', width: '100px' }}
            />
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body1'>承認</Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='commit-radio-group'
                name='commit-radio-group'
              >
                <FormControlLabel
                  value='commit'
                  control={<Radio />}
                  label='承認'
                />
                <FormControlLabel
                  value='uncommit'
                  control={<Radio />}
                  label='未承認'
                />
                <FormControlLabel
                  value='all'
                  control={<Radio />}
                  label='全て'
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Stack>
        {/* TODO: 絞り込みクリアボタンを実装*/}
        {/* TODO: 検索コンポーネントは画面中央に配置し、その右側に絞り込みクリアボタンを配置したい*/}
        <TextButton>絞り込み条件をクリア</TextButton>
      </Stack>
    </Stack>
  )
}
