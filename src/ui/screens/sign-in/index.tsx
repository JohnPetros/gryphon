import { useAuth } from '@/ui/hooks/use-auth'
import { SignInScreenView } from './sign-in-view'
import { useSignInScreen } from './use-sign-in-screen'
import { Redirect } from 'expo-router'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

export const SignInScreen = () => {
  const { isSignedIn } = useAuth()
  const { signInAccount } = useAuthContext()
  const { handleSignIn } = useSignInScreen({
    signInAccount,
  })

  if (isSignedIn) {
    return <Redirect href='/(protected)/(tabs)/vault-itens' />
  }

  return <SignInScreenView onSignIn={handleSignIn} />
}
