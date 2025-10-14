'use client'

import { HouseWorkImage } from '@/components/organisms'
import { Housework } from '@/graphql/generated/components'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

export type HouseWorkCardProps = CardProps & {
  housework: Housework
  onClick?: () => void
}

export const HouseWorkCard = (props: HouseWorkCardProps) => {
  const { housework, onClick, ...remainProps } = props

  return (
    <Card
      sx={{
        width: '250px',
        boxShadow: '0px 4px 4px 0px rgb(0 0 0 / 20%)',
      }}
      {...remainProps}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Stack spacing={1}>
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
