import { Button, ButtonProps } from '@/components/atoms'
import { Typography } from '@mui/material'

export type PrimaryButtonProps = ButtonProps

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { ...buttonProps } = props
  return (
    <Button color='primary' {...buttonProps}>
      <Typography variant='button' sx={{ textTransform: 'none' }}>
        {props.children}
      </Typography>
    </Button>
  )
}
