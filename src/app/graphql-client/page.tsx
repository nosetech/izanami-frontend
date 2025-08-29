import { BaseLayout } from '@/components/templates/BaseLayout'
import { Typography } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MyPage',
  description: 'Chore-XP My Page',
}

export default function Page() {
  return (
    <BaseLayout footerEnable={true}>
      <Typography variant='body1'> test</Typography>
    </BaseLayout>
  )
}
