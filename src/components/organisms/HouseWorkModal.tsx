'use client'

import {
  CreateHouseworkDocument,
  Housework,
  HouseworkCategoryEnum,
  UpdateHouseworkDocument,
} from '@/graphql/generated/components'
import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export type HouseWorkModalProps = {
  open: boolean
  onClose: () => void
  housework?: Housework | null
  isAdmin: boolean
  onSuccess?: () => void
}

export const HouseWorkModal = (props: HouseWorkModalProps) => {
  const { open, onClose, housework, isAdmin, onSuccess } = props
  const isEditMode = !!housework

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<HouseworkCategoryEnum | null>(null)
  const [schedule, setSchedule] = useState('')
  const [point, setPoint] = useState(0)
  const [committed, setCommitted] = useState(false)

  // GraphQL Mutations
  const [createHousework, { loading: createLoading }] = useMutation(
    CreateHouseworkDocument,
  )
  const [updateHousework, { loading: updateLoading }] = useMutation(
    UpdateHouseworkDocument,
  )

  // Initialize form with housework data when editing
  useEffect(() => {
    if (housework) {
      setTitle(housework.title)
      setDescription(housework.description || '')
      setCategory(housework.category)
      setSchedule(housework.schedule || '')
      setPoint(housework.point)
      setCommitted(housework.committed)
    } else {
      // Reset form for new housework
      setTitle('')
      setDescription('')
      setCategory(null)
      setSchedule('')
      setPoint(0)
      setCommitted(false)
    }
  }, [housework, open])

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: HouseworkCategoryEnum | null,
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('タイトルは必須です')
      return
    }

    try {
      if (isEditMode && housework) {
        // Update existing housework
        const { data } = await updateHousework({
          variables: {
            id: housework.id,
            title,
            description: description || undefined,
            category: category || undefined,
            schedule: schedule || undefined,
            point: isAdmin ? point : undefined,
            committed: isAdmin ? committed : undefined,
          },
        })

        if (data?.updateHousework?.errors.length) {
          toast.error(`エラー: ${data.updateHousework.errors.join(', ')}`)
          return
        }

        toast.success('家事を更新しました')
      } else {
        // Create new housework
        const { data } = await createHousework({
          variables: {
            title,
            description: description || undefined,
            category: category || undefined,
            schedule: schedule || undefined,
            point: isAdmin ? point : undefined,
            committed: isAdmin ? committed : undefined,
          },
        })

        if (data?.createHousework?.errors.length) {
          toast.error(`エラー: ${data.createHousework.errors.join(', ')}`)
          return
        }

        toast.success('家事を作成しました')
      }

      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Failed to submit housework:', error)
      toast.error('処理中にエラーが発生しました')
    }
  }

  const isUpdateDisabled = isEditMode && !isAdmin && housework?.committed

  const loading = createLoading || updateLoading

  return (
    <Dialog open={open} onClose={onClose} maxWidth='tablet' fullWidth>
      <DialogTitle>{isEditMode ? '家事の更新' : '家事の作成'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* タイトル */}
          <TextField
            label='タイトル'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          {/* 説明 */}
          <TextField
            label='説明'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          {/* カテゴリ */}
          <FormControl fullWidth>
            <FormLabel>カテゴリ</FormLabel>
            <ToggleButtonGroup
              value={category}
              exclusive
              onChange={handleCategoryChange}
              aria-label='housework category'
              fullWidth
            >
              <ToggleButton
                value={HouseworkCategoryEnum.COOKING}
                aria-label='料理'
              >
                料理
              </ToggleButton>
              <ToggleButton
                value={HouseworkCategoryEnum.CLEANING}
                aria-label='掃除'
              >
                掃除
              </ToggleButton>
              <ToggleButton
                value={HouseworkCategoryEnum.LAUNDRY}
                aria-label='洗濯'
              >
                洗濯
              </ToggleButton>
              <ToggleButton
                value={HouseworkCategoryEnum.SHOPPING}
                aria-label='買い物'
              >
                買い物
              </ToggleButton>
              <ToggleButton
                value={HouseworkCategoryEnum.OTHER}
                aria-label='その他'
              >
                その他
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>

          {/* スケジュール */}
          <TextField
            label='スケジュール'
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          {/* ポイント (管理者のみまたは更新時はdisabledで表示) */}
          {(isAdmin || isEditMode) && (
            <TextField
              label='ポイント'
              type='number'
              value={point}
              onChange={(e) => setPoint(parseInt(e.target.value) || 0)}
              disabled={!isAdmin}
              inputProps={{ min: 0, style: { width: '100px' } }}
            />
          )}

          {/* 承認 (管理者のみまたは更新時はdisabledで表示) */}
          {(isAdmin || isEditMode) && (
            <FormControl disabled={!isAdmin}>
              <FormLabel>承認</FormLabel>
              <RadioGroup
                value={committed ? 'committed' : 'uncommitted'}
                onChange={(e) => setCommitted(e.target.value === 'committed')}
              >
                <FormControlLabel
                  value='committed'
                  control={<Radio />}
                  label='承認'
                />
                <FormControlLabel
                  value='uncommitted'
                  control={<Radio />}
                  label='未承認'
                />
              </RadioGroup>
            </FormControl>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            pb: 1,
          }}
        >
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleSubmit}
              variant='contained'
              disabled={loading || isUpdateDisabled}
              sx={{ minWidth: '120px' }}
            >
              {isEditMode ? '更新' : '作成'}
            </Button>
          </Box>
          <Button onClick={onClose} variant='outlined'>
            キャンセル
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
