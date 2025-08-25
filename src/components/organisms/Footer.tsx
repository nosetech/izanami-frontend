'use client'
import { Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import { ReactNode } from 'react'

type FooterStyleProps = {
  color?: string
  theme?: Theme
  children: ReactNode
}

type FooterProps = {
  color?: string
}

const FooterStyle = styled('div')(({ color, theme }: FooterStyleProps) => ({
  color: color ?? theme?.palette.base.middle,
  backgroundColor: theme?.palette.background.default,
  width: '100%',
  marginTop: 'auto',
}))

export const Footer = (props: FooterProps) => {
  const { color } = props

  return (
    <FooterStyle color={color}>
      <Typography variant='body1' align='center'>
        ©️ 2025 NOSETECH
      </Typography>
    </FooterStyle>
  )
}
