import { LoginTemplate } from '@/components/templates'
import { BaseLayout } from '@/components/templates/BaseLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Chore-XP Login Page',
}

export default function Page() {
  return (
    <BaseLayout footerEnable={true}>
      <LoginTemplate />
    </BaseLayout>
  )
}
