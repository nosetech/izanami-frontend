import { PrimaryButton } from '@/components/atoms'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, StackProps, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

export type AuthFormInput = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required('入力は必須です。'),
  password: yup.string().required('入力は必須です。'),
})

export type AuthInputFieldProps = Omit<StackProps, 'onSubmit'> & {
  onSubmit: SubmitHandler<AuthFormInput>
  loading: boolean
  inputFieldBackgroundColor?: string
  disableHelperText?: boolean
}

export const AuthInputField = (props: AuthInputFieldProps) => {
  const {
    onSubmit,
    loading,
    inputFieldBackgroundColor,
    disableHelperText,
    ...stackProps
  } = props
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AuthFormInput>({
    resolver: yupResolver(schema),
  })

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit({ email: getValues('email'), password: getValues('password') })
    }
  }

  return (
    <Stack component='form' {...stackProps}>
      <TextField
        label='email'
        required
        autoComplete='email'
        error={'email' in errors}
        helperText={!disableHelperText && errors.email?.message}
        slotProps={{
          formHelperText: { style: { fontSize: 8 } },
        }}
        onKeyDown={onEnter}
        {...register('email')}
        sx={
          inputFieldBackgroundColor
            ? { background: inputFieldBackgroundColor }
            : {}
        }
      />
      <TextField
        type='password'
        label='password'
        required
        autoComplete='current-password'
        error={'password' in errors}
        helperText={!disableHelperText && errors.password?.message}
        slotProps={{ formHelperText: { style: { fontSize: 8 } } }}
        onKeyDown={onEnter}
        {...register('password')}
        sx={
          inputFieldBackgroundColor
            ? { background: inputFieldBackgroundColor }
            : {}
        }
      />
      <PrimaryButton
        type='submit'
        loading={loading}
        variant='contained'
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </PrimaryButton>
    </Stack>
  )
}
