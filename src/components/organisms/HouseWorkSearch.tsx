'use client'

import { TextButton, ToggleButton } from '@/components/atoms'
import {
  HouseworkCategoryEnum,
  HouseworkFilterInput,
} from '@/graphql/generated/components'
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
import { useCallback, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'

export type HouseWorkSearchProps = StackProps & {
  onSearchChange?: (filter: HouseworkFilterInput) => void
}

const GRID_LABEL_SIZE = 2
const GRID_INPUT_SIZE = 10
const DEBOUNCE_DELAY = 500 // 500ms debounce for keyword search

// Validation schema for search form
const searchSchema = yup.object().shape({
  keyword: yup.string().default(''),
  categories: yup.array().of(yup.string()).default([]),
  pointMin: yup
    .string()
    .nullable()
    .transform((value) => (value === '' || value === null ? null : value))
    .test(
      'is-valid-number',
      'ポイントは数値である必要があります',
      function (value) {
        if (value === null || value === undefined) return true
        return !isNaN(Number(value)) && isFinite(Number(value))
      },
    )
    .test(
      'is-non-negative',
      'ポイントは0以上である必要があります',
      function (value) {
        if (value === null || value === undefined) return true
        return Number(value) >= 0
      },
    ),
  pointMax: yup
    .string()
    .nullable()
    .transform((value) => (value === '' || value === null ? null : value))
    .test(
      'is-valid-number',
      'ポイントは数値である必要があります',
      function (value) {
        if (value === null || value === undefined) return true
        return !isNaN(Number(value)) && isFinite(Number(value))
      },
    )
    .test(
      'is-non-negative',
      'ポイントは0以上である必要があります',
      function (value) {
        if (value === null || value === undefined) return true
        return Number(value) >= 0
      },
    ),
  committed: yup.string().oneOf(['all', 'true', 'false']).default('all'),
})

export const HouseWorkSearch = ({
  onSearchChange,
  ...props
}: HouseWorkSearchProps) => {
  // Form state
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [pointMin, setPointMin] = useState<string>('')
  const [pointMax, setPointMax] = useState<string>('')
  const [committed, setCommitted] = useState('all')

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Debounce timer ref for keyword search
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Reset all filters to default
  const handleResetFilters = () => {
    setKeyword('')
    setCategories([])
    setPointMin('')
    setPointMax('')
    setCommitted('all')
    setErrors({})

    // Trigger search with empty filter
    if (onSearchChange) {
      onSearchChange({})
    }
  }

  // Handle category change
  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategories: string[],
  ) => {
    setCategories(newCategories)
    executeSearch({ categories: newCategories })
  }

  // Handle commitment status change
  const handleCommittedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newCommitted = event.target.value
    setCommitted(newCommitted)
    executeSearch({ committed: newCommitted })
  }

  // Block invalid characters for point input
  const handlePointKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // 「-」「+」「e」「E」などの入力をブロック
    if (['-', '+', 'e', 'E'].includes(event.key)) {
      event.preventDefault()
    }
  }

  // Handle point min change
  const handlePointMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 数字のみを許可（非数字を削除）
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    setPointMin(numericValue)
    // Debounce the search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      executeSearch({ pointMin: numericValue })
    }, DEBOUNCE_DELAY)
  }

  // Handle point max change
  const handlePointMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 数字のみを許可（非数字を削除）
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    setPointMax(numericValue)
    // Debounce the search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      executeSearch({ pointMax: numericValue })
    }, DEBOUNCE_DELAY)
  }

  // Handle keyword change with debouncing
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value
    setKeyword(newKeyword)

    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new debounce timer
    debounceTimer.current = setTimeout(() => {
      executeSearch({ keyword: newKeyword })
    }, DEBOUNCE_DELAY)
  }

  // Validate and execute search
  const executeSearch = useCallback(
    async (
      overrides?: Partial<{
        keyword?: string
        categories?: string[]
        pointMin?: string
        pointMax?: string
        committed?: string
      }>,
    ) => {
      try {
        // Prepare form data for validation
        const formData = {
          keyword: overrides?.keyword ?? keyword,
          categories: overrides?.categories ?? categories,
          pointMin: overrides?.pointMin ?? pointMin,
          pointMax: overrides?.pointMax ?? pointMax,
          committed: overrides?.committed ?? committed,
        }

        // Validate and cast form data (transform is applied during cast)
        const validatedData = await searchSchema.validate(formData, {
          abortEarly: false,
        })
        setErrors({})

        // Build filter object
        const filter: HouseworkFilterInput = {}

        // Add keyword filter (search in title and description)
        if (validatedData.keyword.trim()) {
          filter.keyword = validatedData.keyword.trim()
        }

        // Add categories filter
        if (validatedData.categories.length > 0) {
          filter.categories = validatedData.categories
            .filter((cat) => cat != null)
            .map((cat) => cat.toUpperCase()) as HouseworkCategoryEnum[]
        }

        // Add point range filter (ブランク値は null に変換されている)
        if (
          validatedData.pointMin !== null &&
          validatedData.pointMin !== undefined
        ) {
          filter.pointMin = parseInt(validatedData.pointMin, 10)
        }
        if (
          validatedData.pointMax !== null &&
          validatedData.pointMax !== undefined
        ) {
          filter.pointMax = parseInt(validatedData.pointMax, 10)
        }

        // Add commitment status filter
        if (validatedData.committed !== 'all') {
          filter.committed = validatedData.committed === 'true'
        }

        // Trigger search callback
        if (onSearchChange) {
          onSearchChange(filter)
        }
      } catch (error) {
        // Collect validation errors
        if (error instanceof yup.ValidationError) {
          const errorMap: Record<string, string> = {}
          error.inner.forEach((err) => {
            if (err.path) {
              errorMap[err.path] = err.message
            }
          })
          setErrors(errorMap)
        }
      }
    },
    [keyword, categories, pointMin, pointMax, committed, onSearchChange],
  )

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return (
    <Stack {...props}>
      <Typography variant='h2'>絞り込み</Typography>
      <Stack p={1} px={2} spacing={1}>
        {/* Keyword Search */}
        <Grid container alignItems='center'>
          <Grid size={GRID_LABEL_SIZE}>
            <Typography variant='body1'>キーワード</Typography>
          </Grid>
          <Grid size={GRID_INPUT_SIZE}>
            <TextField
              size='small'
              placeholder='複数キーワードはスペースで区切る'
              value={keyword}
              onChange={handleKeywordChange}
              error={!!errors.keyword}
              helperText={errors.keyword}
              sx={{
                background: '#ffffff',
                width: '100%',
                borderRadius: '6px',
              }}
            />
          </Grid>
        </Grid>

        {/* Category Filter */}
        <Grid container alignItems='center'>
          <Grid size={GRID_LABEL_SIZE}>
            <Typography variant='body1'>カテゴリ</Typography>
          </Grid>
          <Grid size={GRID_INPUT_SIZE}>
            <ToggleButtonGroup
              value={categories}
              onChange={handleCategoryChange}
              aria-label='category'
              size='small'
            >
              <ToggleButton value='cooking' aria-label='cooking'>
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

        {/* Point Range Filter */}
        <Grid container alignItems='center'>
          <Grid size={GRID_LABEL_SIZE}>
            <Typography variant='body1'>ポイント</Typography>
          </Grid>
          <Grid size={GRID_INPUT_SIZE}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Stack>
                <TextField
                  type='number'
                  size='small'
                  placeholder='最小値'
                  value={pointMin}
                  onChange={handlePointMinChange}
                  onKeyDown={handlePointKeyDown}
                  error={!!errors.pointMin}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    },
                  }}
                  sx={{
                    background: '#ffffff',
                    width: '100px',
                    borderRadius: '6px',
                  }}
                />
                {errors.pointMin && (
                  <Typography variant='caption' sx={{ color: '#d32f2f' }}>
                    {errors.pointMin}
                  </Typography>
                )}
              </Stack>
              <Typography variant='body1' sx={{ mt: 1 }}>
                〜
              </Typography>
              <Stack>
                <TextField
                  type='number'
                  size='small'
                  placeholder='最大値'
                  value={pointMax}
                  onChange={handlePointMaxChange}
                  onKeyDown={handlePointKeyDown}
                  error={!!errors.pointMax}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    },
                  }}
                  sx={{
                    background: '#ffffff',
                    width: '100px',
                    borderRadius: '6px',
                  }}
                />
                {errors.pointMax && (
                  <Typography variant='caption' sx={{ color: '#d32f2f' }}>
                    {errors.pointMax}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Commitment Status Filter */}
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
                value={committed}
                onChange={handleCommittedChange}
              >
                <FormControlLabel
                  value='all'
                  control={<Radio size='small' />}
                  label='全て'
                />
                <FormControlLabel
                  value='true'
                  control={<Radio size='small' />}
                  label='承認'
                />
                <FormControlLabel
                  value='false'
                  control={<Radio size='small' />}
                  label='未承認'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>

      {/* Clear Filters Button */}
      <Box mt={-2} width='100%' display='flex' justifyContent='flex-end'>
        <TextButton onClick={handleResetFilters}>
          絞り込み条件をクリア
        </TextButton>
      </Box>
    </Stack>
  )
}
