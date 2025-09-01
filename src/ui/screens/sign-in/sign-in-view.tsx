import { AppIcon } from '@/ui/components/app-icon'
import { AppName } from '@/ui/components/app-name'
import { Input } from '@/ui/components/input'
import { ScreenContainer } from '@/ui/components/screen-container'
import { Box } from '@/ui/gluestack/box'
import { Button } from '@/ui/components/button'
import { Link } from 'expo-router'
import { PasswordInput } from '@/ui/components/password-input'

export const SignInScreenView = () => {
  return (
    <ScreenContainer>
      <Box className='flex flex-row items-center justify-center gap-3'>
        <AppIcon size='md' />
        <AppName size='4xl' />
      </Box>
      <Box className='mt-12'>
        <Input icon='email' placeholder='vicent@rijmen.com' label='Email' />
        <PasswordInput label='Senha' onChange={() => {}} />
      </Box>

      <Box className='mt-4 flex flex-row items-center justify-between'>
        <Link href='/auth/sign-in' className='text-primary text-lg underline'>
          Criar conta
        </Link>
      </Box>

      <Box className='mt-12'>
        <Button onPress={() => {}}>Acessar</Button>
      </Box>
    </ScreenContainer>
  )
}
