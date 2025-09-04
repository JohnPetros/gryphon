import { useAuth } from '@/ui/hooks/useAuth'
import { SignInScreenView } from './sign-in-view'
import { useSignInScreen } from './use-sign-in-screen'

export const SignInScreen = () => {
  const { signInAccount } = useAuth()
  const { handleSignIn } = useSignInScreen({
    signInAccount,
  })

  return <SignInScreenView onSignIn={handleSignIn} />
}
