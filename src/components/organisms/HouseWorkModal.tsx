'use client'

import { ToggleButton } from '@/components/atoms'
import {
  CreateHouseworkDocument,
  DeleteHouseworkDocument,
  Housework,
  HouseworkCategoryEnum,
  UpdateHouseworkDocument,
} from '@/graphql/generated/components'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ToggleButtonGroup,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export type HouseWorkFormInput = {
  title: string
  description: string
  category: HouseworkCategoryEnum
  schedule: string
  point: number
  committed: boolean
}

export type HouseWorkModalProps = {
  open: boolean
  onClose: () => void
  housework?: Housework | null
  isAdmin: boolean
  onSuccess?: () => void
  onDelete?: () => void
}

const schema = yup.object({
  title: yup.string().required('タイトルは必須です'),
  description: yup.string().default(''),
  category: yup
    .string()
    .oneOf(Object.values(HouseworkCategoryEnum))
    .required()
    .default(HouseworkCategoryEnum.COOKING),
  schedule: yup.string().default(''),
  point: yup.number().min(0, 'ポイントは0以上である必要があります').default(0),
  committed: yup.boolean().default(false),
})

const TOGGLE_BUTTON_STYLE = {
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.12) !important',
}

export const HouseWorkModal = (props: HouseWorkModalProps) => {
  const { open, onClose, housework, isAdmin, onSuccess, onDelete } = props
  const isEditMode = !!housework
  const { currentUser } = useCurrentUser()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  // Form state with react-hook-form
  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<HouseWorkFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      category: HouseworkCategoryEnum.COOKING,
      schedule: '',
      point: 0,
      committed: false,
    },
  })

  // GraphQL Mutations
  const [createHousework, { loading: createLoading }] = useMutation(
    CreateHouseworkDocument,
  )
  const [updateHousework, { loading: updateLoading }] = useMutation(
    UpdateHouseworkDocument,
  )
  const [deleteHousework, { loading: deleteLoading }] = useMutation(
    DeleteHouseworkDocument,
  )

  // Initialize form with housework data when editing
  useEffect(() => {
    if (housework) {
      reset({
        title: housework.title,
        description: housework.description || '',
        category: housework.category,
        schedule: housework.schedule || '',
        point: housework.point,
        committed: housework.committed,
      })
    } else {
      // Reset form for new housework
      reset({
        title: '',
        description: '',
        category: HouseworkCategoryEnum.COOKING,
        schedule: '',
        point: 0,
        committed: false,
      })
    }
  }, [housework, open, reset])

  const handleSubmit: SubmitHandler<HouseWorkFormInput> = async (data) => {
    try {
      if (isEditMode && housework) {
        // Update existing housework
        const { data: result } = await updateHousework({
          variables: {
            id: housework.id,
            title: data.title,
            description: data.description || undefined,
            category: data.category || undefined,
            schedule: data.schedule || undefined,
            point: isAdmin ? data.point : undefined,
            committed: isAdmin ? data.committed : undefined,
          },
        })

        if (result?.updateHousework?.errors.length) {
          toast.error(`エラー: ${result.updateHousework.errors.join(', ')}`)
          return
        }

        toast.success('家事を更新しました')
      } else {
        // Create new housework
        const { data: result } = await createHousework({
          variables: {
            title: data.title,
            description: data.description || undefined,
            category: data.category || undefined,
            schedule: data.schedule || undefined,
            point: isAdmin ? data.point : undefined,
            committed: isAdmin ? data.committed : undefined,
          },
        })

        if (result?.createHousework?.errors.length) {
          toast.error(`エラー: ${result.createHousework.errors.join(', ')}`)
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

  // 削除権限の判定
  const canDelete = (): boolean => {
    if (!isEditMode || !housework || !currentUser) return false

    const isCreator = currentUser.id === housework.suggestedBy.id
    const isApproved = housework.committed

    // 未承認の家事：管理者 OR 作成者
    if (!isApproved) {
      return isAdmin || isCreator
    }

    // 承認済みの家事：管理者のみ
    return isAdmin
  }

  // 削除処理
  const handleDelete = async () => {
    if (!housework) return

    try {
      const { data: result } = await deleteHousework({
        variables: {
          id: housework.id,
        },
      })

      if (result?.deleteHousework?.errors.length) {
        toast.error(`削除エラー: ${result.deleteHousework.errors.join(', ')}`)
        return
      }

      toast.success('家事を削除しました')
      onDelete?.()
      setDeleteConfirmOpen(false)
      onClose()
    } catch (error) {
      console.error('Failed to delete housework:', error)
      toast.error('削除処理中にエラーが発生しました')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='tablet' fullWidth>
      <DialogTitle>{isEditMode ? '家事の更新' : '家事の作成'}</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* タイトル */}
          <TextField
            label='タイトル'
            {...register('title')}
            required
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          {/* 説明 */}
          <TextField
            label='説明'
            {...register('description')}
            multiline
            rows={4}
            fullWidth
          />

          {/* カテゴリ */}
          <FormControl fullWidth>
            <FormLabel>カテゴリ</FormLabel>
            <Controller
              name='category'
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  value={field.value}
                  exclusive
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      field.onChange(newValue)
                    }
                  }}
                  aria-label='housework category'
                  fullWidth
                >
                  <ToggleButton
                    value={HouseworkCategoryEnum.COOKING}
                    aria-label='料理'
                    sx={TOGGLE_BUTTON_STYLE}
                  >
                    料理
                  </ToggleButton>
                  <ToggleButton
                    value={HouseworkCategoryEnum.CLEANING}
                    aria-label='掃除'
                    sx={TOGGLE_BUTTON_STYLE}
                  >
                    掃除
                  </ToggleButton>
                  <ToggleButton
                    value={HouseworkCategoryEnum.LAUNDRY}
                    aria-label='洗濯'
                    sx={TOGGLE_BUTTON_STYLE}
                  >
                    洗濯
                  </ToggleButton>
                  <ToggleButton
                    value={HouseworkCategoryEnum.SHOPPING}
                    aria-label='買い物'
                    sx={TOGGLE_BUTTON_STYLE}
                  >
                    買い物
                  </ToggleButton>
                  <ToggleButton
                    value={HouseworkCategoryEnum.OTHER}
                    aria-label='その他'
                    sx={TOGGLE_BUTTON_STYLE}
                  >
                    その他
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </FormControl>

          {/* スケジュール */}
          <TextField
            label='スケジュール'
            {...register('schedule')}
            multiline
            rows={3}
            fullWidth
          />

          {/* ポイント (管理者のみまたは更新時はdisabledで表示) */}
          {(isAdmin || isEditMode) && (
            <Controller
              name='point'
              control={control}
              render={({ field }) => (
                <TextField
                  label='ポイント'
                  type='number'
                  value={field.value}
                  sx={{ width: '100px' }}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                  disabled={!isAdmin}
                  slotProps={{
                    htmlInput: { min: 0, style: { width: '100px' } },
                  }}
                  error={!!errors.point}
                  helperText={errors.point?.message}
                />
              )}
            />
          )}

          {/* 承認 (管理者のみまたは更新時はdisabledで表示) */}
          {(isAdmin || isEditMode) && (
            <FormControl disabled={!isAdmin}>
              <FormLabel>承認</FormLabel>
              <Controller
                name='committed'
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    row
                    value={field.value ? 'committed' : 'uncommitted'}
                    onChange={(e) =>
                      field.onChange(e.target.value === 'committed')
                    }
                  >
                    <FormControlLabel
                      value='uncommitted'
                      control={<Radio />}
                      label='未承認'
                    />
                    <FormControlLabel
                      value='committed'
                      control={<Radio />}
                      label='承認'
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          )}
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            px: 2,
            py: 1,
          }}
        >
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            {isEditMode && canDelete() && (
              <Button
                onClick={() => setDeleteConfirmOpen(true)}
                variant='outlined'
                color='error'
                disabled={loading || deleteLoading}
              >
                削除
              </Button>
            )}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleFormSubmit(handleSubmit)}
              variant='contained'
              disabled={loading || isUpdateDisabled}
              sx={{ minWidth: '120px' }}
            >
              {isEditMode ? '更新' : '作成'}
            </Button>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} variant='outlined'>
              キャンセル
            </Button>
          </Box>
        </Box>
      </DialogActions>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            家事「{housework?.title}」を削除してもよろしいですか？
            <br />
            この操作は取り消せません。
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            variant='outlined'
            disabled={deleteLoading}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleDelete}
            variant='contained'
            color='error'
            disabled={deleteLoading}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}
