import { ScreenContainer } from '@/ui/components/screen-container'
import { SignInForm } from './sign-in-form'
import { AppName } from '@/ui/components/app-name'
import { AppIcon } from '@/ui/components/app-icon'
import { Box } from '@/ui/gluestack/box'

type Props = {
  onSignIn: (email: string, password: string) => Promise<void>
}

export const SignInScreenView = ({ onSignIn }: Props) => {
  return (
    <ScreenContainer>
      <Box className='flex flex-row items-center justify-center gap-3'>
        <AppIcon size='md' />
        <AppName size='4xl' />
      </Box>
      <Box className='mt-12'>
        <SignInForm onSignIn={onSignIn} />
      </Box>
    </ScreenContainer>
  )
}
