'use client'
import { blue, cyan, green, pink, red, yellow } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

import { grey } from '@/theme/color'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false // removes the `xs` breakpoint
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true // adds the `mobile` breakpoint
    tablet: true
    laptop: true
    desktop: true
  }
  interface Palette {
    alert: {
      main: string
    }
    base: {
      main: string
      deep: string
      middle: string
      pale: string
      bright: string
    }
    foreground: {
      default: string
    }
  }
  interface PaletteOptions {
    alert?: {
      main?: string
    }
    base?: {
      main?: string
      deep?: string
      middle?: string
      pale?: string
      bright?: string
    }
    foreground?: {
      default?: string
    }
  }
}

export const defaultTheme = createTheme({
  spacing: 8,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: blue[300],
    },
    secondary: {
      main: pink[300],
    },
    error: {
      main: red[500],
    },
    warning: {
      main: yellow[500],
    },
    info: {
      main: cyan[300],
    },
    success: {
      main: green[300],
    },
    text: {
      primary: '#181818',
      secondary: '#8E8F8F',
      disabled: '#BEBEBF',
    },
    alert: {
      main: '#FF6161',
    },
    base: {
      main: '#101010',
      deep: '#404040',
      middle: '#707070',
      pale: '#C0C0C0',
      bright: '#f5f5f5',
    },
    foreground: {
      default: '#EEF4B0',
    },
    background: {
      default: '#E3DDC2',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 15,
    htmlFontSize: 15,
    body1: { fontSize: 15 },
    body2: {
      fontSize: 15,
      color: grey[300],
    },
    button: {
      fontSize: 13,
      color: '#ffffff',
    },
    h1: {
      fontSize: 20,
      fontWeight: 700,
    },
    h2: {
      fontSize: 18,
      fontWeight: 700,
    },
    h3: {
      fontSize: 15,
      fontWeight: 500,
    },
    h4: {
      fontSize: 14,
    },
  },
})
