import { Controller } from 'react-hook-form'

import { Button } from '@/ui/components/button'
import { Input } from '@/ui/components/input'
import { PasswordInput } from '@/ui/components/password-input'
import { Box } from '@/ui/gluestack/box'
import { useSignInForm } from './use-sign-in-form'
import { Link } from 'expo-router'

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

      <Box className='flex flex-row items-center justify-between mt-6'>
        {/* <Link href='/auth/sign-up' className='text-primary p-2'>
          Esqueceu sua senha?
        </Link> */}
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
