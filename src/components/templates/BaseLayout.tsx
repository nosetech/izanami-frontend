'use client'
import { AppBar, Footer } from '@/components/organisms'
import { styled, Theme } from '@mui/material'
import { ReactNode } from 'react'

type BaseStyleProps = {
  theme?: Theme
  children: ReactNode
}
type BaseLayoutProps = BaseStyleProps & {
  footerEnable?: boolean
}

const BaseStyle = styled('div')(({ theme }: BaseStyleProps) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme?.palette.background.default,
  minHeight: '100vh',
  height: '100vh',
  boxsizing: 'border-box',
}))

export const BaseLayout = ({ footerEnable, children }: BaseLayoutProps) => {
  return (
    <BaseStyle>
      <AppBar />
      {children}
      {footerEnable && <Footer />}
    </BaseStyle>
  )
}
