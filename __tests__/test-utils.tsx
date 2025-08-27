import { defaultTheme } from '@/theme/default'
import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'

// カスタムレンダー関数（ThemeProviderでラップ）
export const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>)
}

// react-test-rendererも修正
export const createWithTheme = (ui: React.ReactElement) => {
  return renderer.create(
    <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>,
  )
}
