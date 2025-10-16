'use client'

import { HouseWorkImage } from '@/components/organisms'
import { Housework } from '@/graphql/generated/components'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

export type HouseWorkCardProps = CardProps & {
  housework: Housework
  onClick?: () => void
}

/**
 * ラベル表示ロジック
 * - 未承認の場合: 「未承認」ラベル
 * - 承認済みの場合:
 *   - 作成日時が1週間以内: 「New」ラベル
 *   - 作成日時が1週間以内でなく、更新日時が1週間以内: 「Update」ラベル
 */
const getLabel = (housework: Housework): string | null => {
  // 未承認チェック
  if (!housework.committed) {
    return '未承認'
  }

  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const createdAt = new Date(housework.createdAt)
  const updatedAt = new Date(housework.updatedAt)

  // 作成日時が1週間以内
  if (createdAt > oneWeekAgo) {
    return 'New'
  }

  // 更新日時が1週間以内
  if (updatedAt > oneWeekAgo) {
    return 'Update'
  }

  return null
}

export const HouseWorkCard = (props: HouseWorkCardProps) => {
  const { housework, onClick, ...remainProps } = props
  const label = getLabel(housework)

  return (
    <Card
      sx={{
        width: '250px',
        boxShadow: '0px 4px 4px 0px rgb(0 0 0 / 20%)',
        position: 'relative',
      }}
      {...remainProps}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Stack mt={-1} spacing={1}>
            <Box height={24}>
              {label && (
                <Chip
                  label={label}
                  size='small'
                  sx={{
                    backgroundColor:
                      label === '未承認'
                        ? '#D1D1D1'
                        : label === 'New'
                          ? '#64B5F6'
                          : '#81C784',
                    color: '#FFFFFF',
                  }}
                />
              )}
            </Box>
            <Stack width='100%' alignItems='center'>
              <HouseWorkImage
                category={housework.category}
                width={150}
                height={110}
              />
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h2'>{housework.title}</Typography>
              <Box
                p={0.5}
                sx={{ backgroundColor: '#C5ECA3', borderRadius: '6px' }}
              >
                <Typography variant='h4'>{housework.point}p</Typography>
              </Box>
            </Stack>
            <Typography variant='h4'>{housework.description}</Typography>
            <Divider />
            <Typography variant='body1'>{housework.schedule}</Typography>
            <Divider />
            <Typography variant='h4'>
              Suggested {housework.suggestedBy.name}
            </Typography>
            <Typography variant='h4'>Created {housework.createdAt}</Typography>
            <Typography variant='h4'>Updated {housework.updatedAt}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
