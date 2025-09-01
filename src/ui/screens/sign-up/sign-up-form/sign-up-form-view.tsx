import { Button } from '@/ui/components/button'
import { Input } from '@/ui/components/input'
import { PasswordInput } from '@/ui/components/password-input'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { Controller } from 'react-hook-form'
import { useSignUpForm } from './use-sign-up-form'

type Props = {
  onSignUp: (email: string, password: string) => Promise<void>
}

export const SignUpFormView = ({ onSignUp }: Props) => {
  const { isSubmitting, isValid, control, handleSubmit } = useSignUpForm(onSignUp)
  return (
    <Box>
      <Box>
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
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <PasswordInput label='Senha' onChange={field.onChange} />
          )}
        />
      </Box>

      <Box className='mt-6 flex flex-row items-center justify-between'>
        <Text className='text-neutral text-lg'>
          Uma senha forte contém pelo menos 8 caracteres, números, letras maiúsculas e
          minúsculas.
        </Text>
      </Box>

      <Box className='mt-12'>
        <Button onPress={handleSubmit} isDisabled={!isValid} isLoading={isSubmitting}>
          Criar conta
        </Button>
      </Box>
    </Box>
  )
}
