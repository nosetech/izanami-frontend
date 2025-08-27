import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { defaultTheme } from '@/theme/default'

// カスタムレンダー関数（ThemeProviderでラップ）
export const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={defaultTheme}>
      {ui}
    </ThemeProvider>
  )
}

// react-test-rendererも修正
export const createWithTheme = (ui: React.ReactElement) => {
  const renderer = require('react-test-renderer')
  return renderer.create(
    <ThemeProvider theme={defaultTheme}>
      {ui}
    </ThemeProvider>
  )
}