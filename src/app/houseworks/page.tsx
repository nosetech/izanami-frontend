import { HouseWorksTemplate } from '@/components/templates'
import { BaseLayout } from '@/components/templates/BaseLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HouseWorks',
  description: 'Chore-XP HouseWorks Page',
}

export default function Page() {
  return (
    <BaseLayout footerEnable={true}>
      <HouseWorksTemplate />
    </BaseLayout>
  )
}
