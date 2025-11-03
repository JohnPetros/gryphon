import { Controller } from 'react-hook-form'

import { Box } from '@/ui/gluestack/box'
import { Button } from '@/ui/components/button'
import { Text } from '@/ui/gluestack/text'
import { PasswordInput } from '@/ui/components/password-input'
import { usePasswordForm } from './use-password-form'

type Props = {
  otp: string
  resetPassword: (otp: string, password: string) => Promise<void>
  onPasswordReset: () => void
}

export const PasswordFormView = ({ otp, resetPassword, onPasswordReset }: Props) => {
  const { isSubmitting, isValid, control, handleSubmit } = usePasswordForm({
    otp,
    resetPassword,
    onPasswordReset,
  })

  return (
    <Box>
      <Text className='text-neutral text-xl'>Insira a sua nova senha.</Text>

      <Box className='mt-12'>
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <PasswordInput
              label='Sua nova senha'
              hasStrength
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Box>

      <Box className='mt-12'>
        <Button onPress={handleSubmit} isDisabled={!isValid} isLoading={isSubmitting}>
          Redefinir senha
        </Button>
      </Box>
    </Box>
  )
}
