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
  Tooltip,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// Setup dayjs
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale(ja)

export type HouseWorkCardProps = CardProps & {
  housework: Housework
  onClick?: () => void
}

/**
 * Format date to Japan timezone (YYYY/MM/DD HH:MM:SS)
 */
const formatDateToJST = (dateString: string): string => {
  return dayjs(dateString).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss')
}

/**
 * Check if text is truncated and return truncated text with ellipsis
 */
const truncateText = (
  text: string,
  maxLines: number,
  maxCharPerLine: number,
): { truncated: string; isTruncated: boolean } => {
  const maxChars = maxLines * maxCharPerLine
  if (text.length > maxChars) {
    return {
      truncated: text.substring(0, maxChars - 1) + '...',
      isTruncated: true,
    }
  }
  return {
    truncated: text,
    isTruncated: false,
  }
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

  // Text truncation for title (1 line, ~25 chars)
  const titleTruncation = truncateText(housework.title, 1, 25)

  // Text truncation for description (2 lines, ~20 chars per line)
  const descriptionTruncation = truncateText(housework.description || '', 2, 20)

  // Text truncation for schedule (2 lines, ~20 chars per line)
  const scheduleTruncation = truncateText(housework.schedule || '', 2, 20)

  // Format dates to JST
  const formattedCreatedAt = formatDateToJST(housework.createdAt)
  const formattedUpdatedAt = formatDateToJST(housework.updatedAt)

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
              <Tooltip
                title={housework.title}
                disableHoverListener={!titleTruncation.isTruncated}
              >
                <Typography
                  variant='h2'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {titleTruncation.truncated}
                </Typography>
              </Tooltip>
              <Box
                p={0.5}
                sx={{ backgroundColor: '#C5ECA3', borderRadius: '6px' }}
              >
                <Typography variant='h4'>{housework.point}p</Typography>
              </Box>
            </Stack>
            <Tooltip
              title={housework.description || ''}
              disableHoverListener={!descriptionTruncation.isTruncated}
            >
              <Typography
                variant='h4'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '2.4em',
                }}
              >
                {descriptionTruncation.truncated}
              </Typography>
            </Tooltip>
            <Divider />
            <Tooltip
              title={housework.schedule || ''}
              disableHoverListener={!scheduleTruncation.isTruncated}
            >
              <Typography
                variant='body1'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '2.4em',
                }}
              >
                {scheduleTruncation.truncated}
              </Typography>
            </Tooltip>
            <Divider />
            <Stack direction='row' spacing={1}>
              <Typography variant='h4' sx={{ width: '80px', flexShrink: 0 }}>
                Suggested
              </Typography>
              <Typography variant='h4'>{housework.suggestedBy.name}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <Typography variant='h4' sx={{ width: '80px', flexShrink: 0 }}>
                Created
              </Typography>
              <Typography variant='h4'>{formattedCreatedAt}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <Typography variant='h4' sx={{ width: '80px', flexShrink: 0 }}>
                Updated
              </Typography>
              <Typography variant='h4'>{formattedUpdatedAt}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
