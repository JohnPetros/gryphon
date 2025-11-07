import { Controller } from 'react-hook-form'

import { Box } from '@/ui/gluestack/box'
import { useEmailForm } from './use-email-form'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { Text } from '@/ui/gluestack/text'

type Props = {
  sendPasswordResetEmail: (email: string) => Promise<void>
  onSendPasswordResetEmail: () => void
}

export const EmailFormView = ({
  sendPasswordResetEmail,
  onSendPasswordResetEmail,
}: Props) => {
  const { isSubmitting, isValid, control, handleSubmit } = useEmailForm({
    sendPasswordResetEmail,
    onSendPasswordResetEmail,
  })

  return (
    <Box>
      <Text className='text-neutral text-xl'>
        Envie um email para você para redefinir sua senha.
      </Text>

      <Box className='mt-12'>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <Input
              icon='email'
              placeholder='vicent@rijmen.com'
              label='Email'
              onChange={field.onChange}
            />
          )}
        />
      </Box>

      <Box className='mt-12'>
        <Button onPress={handleSubmit} isDisabled={!isValid} isLoading={isSubmitting}>
          Enviar E-mail
        </Button>
      </Box>
    </Box>
  )
}
