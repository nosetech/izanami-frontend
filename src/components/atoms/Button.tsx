import { LoadingButton, LoadingButtonProps } from '@mui/lab'
export type ButtonProps = LoadingButtonProps

export const Button = (props: ButtonProps) => {
  const { loading } = props
  return (
    <LoadingButton
      variant='contained'
      loadingPosition={loading ? 'end' : undefined}
      {...props}
    >
      {props.children}
    </LoadingButton>
  )
}
