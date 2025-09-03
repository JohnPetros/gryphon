import { ScreenContainer } from '@/ui/components/screen-container'
import { SignInForm } from './sign-in-form'

type Props = {
  onSignIn: (email: string, password: string) => Promise<void>
}

export const SignInScreenView = ({ onSignIn }: Props) => {
  return (
    <ScreenContainer>
      <SignInForm onSignIn={onSignIn} />
    </ScreenContainer>
  )
}
