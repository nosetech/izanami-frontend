'use client'

import { TextButton, ToggleButton } from '@/components/atoms'
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  StackProps,
  TextField,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useState } from 'react'

export type HouseWorkSearchProps = StackProps

const GRID_LABEL_SIZE = 2
const GRID_INPUT_SIZE = 10

export const HouseWorkSearch = (props: HouseWorkSearchProps) => {
  const [category, setCategory] = useState<string[]>([])

  const handleCategory = (
    _event: React.MouseEvent<HTMLElement>,
    newCategorys: string[],
  ) => {
    setCategory(newCategorys)
  }

  return (
    <Stack {...props}>
      <Typography variant='h2'>絞り込み</Typography>
      {/* TODO: 検索コンポーネントの実装*/}
      <Stack p={1} px={2} spacing={1}>
        <Grid container alignItems='center'>
          <Grid size={GRID_LABEL_SIZE}>
            <Typography variant='body1'>キーワード</Typography>
          </Grid>
          <Grid size={GRID_INPUT_SIZE}>
            <TextField
              size='small'
              sx={{
                background: '#ffffff',
                width: '100%',
                borderRadius: '6px',
              }}
            />
          </Grid>
        </Grid>
        <Grid container alignItems='center'>
          <Grid size={GRID_LABEL_SIZE}>
            <Typography variant='body1'>カテゴリ</Typography>
          </Grid>
          <Grid size={GRID_INPUT_SIZE}>
            <ToggleButtonGroup
              value={category}
              onChange={handleCategory}
              aria-label='category'
              size='small'
            >
              <ToggleButton value='cooking' aria-label='coking'>
                料理
              </ToggleButton>
              <ToggleButton value='cleaning' aria-label='cleaning'>
                掃除
              </ToggleButton>
              <ToggleButton value='shopping' aria-label='shopping'>
                買い物
              </ToggleButton>
              <ToggleButton value='laundry' aria-label='laundry'>
                洗濯
              </ToggleButton>
              <ToggleButton value='other' aria-label='other'>
                その他
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container alignItems='center'>
          <Grid size={GRID_LABEL_SIZE}>
            <Typography variant='body1'>ポイント</Typography>
          </Grid>
          <Grid size={GRID_INPUT_SIZE}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <TextField
                type='number'
                size='small'
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
                sx={{
                  background: '#ffffff',
                  width: '100px',
                  borderRadius: '6px',
                }}
              />
              <Typography variant='body1'>〜</Typography>
              <TextField
                type='number'
                size='small'
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
                sx={{
                  background: '#ffffff',
                  width: '100px',
                  borderRadius: '6px',
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container alignItems='center'>
          <Grid size={GRID_LABEL_SIZE}>
            <Typography variant='body1'>承認</Typography>
          </Grid>
          <Grid size={GRID_INPUT_SIZE}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='commit-radio-group'
                name='commit-radio-group'
                defaultValue='all'
              >
                <FormControlLabel
                  value='all'
                  control={<Radio size='small' />}
                  label='全て'
                />
                <FormControlLabel
                  value='commit'
                  control={<Radio size='small' />}
                  label='承認'
                />
                <FormControlLabel
                  value='uncommit'
                  control={<Radio size='small' />}
                  label='未承認'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
      {/* TODO: 絞り込みクリアボタンを実装*/}
      <Box mt={-2} width='100%' display='flex' justifyContent='flex-end'>
        <TextButton>絞り込み条件をクリア</TextButton>
      </Box>
    </Stack>
  )
}
