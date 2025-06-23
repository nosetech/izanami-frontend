'use client'
import {
  blue,
  cyan,
  green,
  lightBlue,
  pink,
  red,
  yellow,
} from '@mui/material/colors'
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
    dashboard: {
      background: string
      appbar: string
      appbarText: string
    }
    account: {
      background: string
      appbar: string
      appbarText: string
    }
    drop: {
      background: string
      dropBackground: string
      appbar: string
      appbarText: string
    }
    result: {
      background: string
      appbar: string
      appbarText: string
      todayBackground: string
      resultGreen: string
      resultBackgroundGreen: string
      resultRed: string
      resultBackgroundRed: string
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
    dashboard?: {
      background?: string
      appbar?: string
      appbarText?: string
    }
    account?: {
      background?: string
      appbar?: string
      appbarText?: string
    }
    drop?: {
      background?: string
      dropBackground?: string
      appbar?: string
      appbarText?: string
    }
    result?: {
      background?: string
      appbar?: string
      appbarText?: string
      todayBackground?: string
      resultGreen?: string
      resultBackgroundGreen?: string
      resultRed?: string
      resultBackgroundRed?: string
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
    dashboard: {
      background: grey[100],
      appbar: blue[300],
      appbarText: '#ffffff',
    },
    account: {
      background: green[50],
      appbar: green[300],
      appbarText: '#ffffff',
    },
    drop: {
      background: grey[100],
      dropBackground: '#BBD7ED',
      appbar: '#B3FC99',
      appbarText: grey[900],
    },
    result: {
      background: grey[100],
      appbar: '#E4DA7D',
      appbarText: grey[900],
      todayBackground: lightBlue[100],
      resultGreen: '#B3FC99',
      resultBackgroundGreen: 'rgba(179,252,153,0.3)',
      resultRed: '#E47D83',
      resultBackgroundRed: 'rgba(228,125,131,0.3)',
    },
    background: {
      default: grey[0],
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
