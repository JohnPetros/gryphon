import { Controller } from 'react-hook-form'

import { Button } from '@/ui/components/button'
import { Input } from '@/ui/components/input'
import { PasswordInput } from '@/ui/components/password-input'
import { Box } from '@/ui/gluestack/box'
import { useSignInForm } from './use-sign-in-form'
import { Link } from 'expo-router'
import { Text } from '@/ui/gluestack/text'
import { CLIENT_ENV } from '@/constants'

type Props = {
  onSignIn: (email: string, password: string) => Promise<void>
}

export const SignInFormView = ({ onSignIn }: Props) => {
  const { isSubmitting, isValid, control, handleSubmit } = useSignInForm(onSignIn)
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
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <PasswordInput
              label='Senha'
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Box>

      <Text>{JSON.stringify(CLIENT_ENV, null, 2)}</Text>

      <Box className='flex flex-row items-center justify-between mt-6'>
        <Link href='/auth/reset-password' className='text-primary p-2'>
          Esqueceu sua senha?
        </Link>
        <Link href='/auth/sign-up' className='text-primary p-2'>
          Criar conta
        </Link>
      </Box>

      <Box className='mt-12'>
        <Button onPress={handleSubmit} isDisabled={!isValid} isLoading={isSubmitting}>
          Entrar
        </Button>
      </Box>
    </Box>
  )
}
