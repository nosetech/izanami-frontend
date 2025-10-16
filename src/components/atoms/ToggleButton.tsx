'use client'
import {
  ToggleButton as MUIToggleButton,
  ToggleButtonProps as MUIToggleButtonProps,
} from '@mui/material'
export type ToggleButtonProps = MUIToggleButtonProps

const TOGGLE_BUTTON_STYLE = {
  width: '70px',
  border: '0.5px solid rgba(0, 0, 0, 0.12) !important',
  '&.MuiToggleButtonGroup-grouped': {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
  },
  backgroundColor: '#D5D5D5',
  '&:hover': {
    backgroundColor: '#E3E3E3',
  },
  '&.Mui-selected': {
    backgroundColor: '#ffffff',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#ffffff',
  },
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { children, sx, ...remainProps } = props

  return (
    <MUIToggleButton sx={{ ...TOGGLE_BUTTON_STYLE, ...sx }} {...remainProps}>
      {children}
    </MUIToggleButton>
  )
}
