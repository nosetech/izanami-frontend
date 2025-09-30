import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { useTheme } from '@mui/material'
export type TextButtonProps = LoadingButtonProps

export const TextButton = (props: TextButtonProps) => {
  const { loading } = props

  const theme = useTheme()

  return (
    <LoadingButton
      variant='text'
      loadingPosition={loading ? 'end' : undefined}
      sx={{
        color: theme.palette.text.primary,
        textDecoration: 'underline',
        '&:hover': {
          fontWeight: 'bold',
          textDecoration: 'underline',
        },
      }}
      {...props}
    >
      {props.children}
    </LoadingButton>
  )
}
