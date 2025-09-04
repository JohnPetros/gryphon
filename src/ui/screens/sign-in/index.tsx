import { useClerkAuthService } from '@/ui/hooks/useClerkAuthService'
import { SignInScreenView } from './sign-in-view'
import { useSignInScreen } from './use-sign-in-screen'

export const SignInScreen = () => {
  const { signInAccount } = useClerkAuthService()
  const { handleSignIn } = useSignInScreen({
    signInAccount,
  })

  return <SignInScreenView onSignIn={handleSignIn} />
}
