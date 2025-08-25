'use client'
import { Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import { ReactNode } from 'react'

type FooterStyleProps = {
  color?: string
  backgroundColor?: string
  theme?: Theme
  children: ReactNode
}

type FooterProps = {
  color?: string
  backgroundColor?: string
}

const FooterStyle = styled('div')(
  ({ color, backgroundColor, theme }: FooterStyleProps) => ({
    color: color ?? theme?.palette.base.middle,
    backgroundColor: backgroundColor ?? theme?.palette.background.default,
    width: '100%',
    marginTop: 'auto',
  }),
)

export const Footer = (props: FooterProps) => {
  const { color, backgroundColor } = props

  return (
    <FooterStyle color={color} backgroundColor={backgroundColor}>
      <Typography variant='body1' align='center'>
        ©️ 2025 NOSETECH
      </Typography>
    </FooterStyle>
  )
}
