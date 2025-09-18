import { useAuth } from '@/ui/hooks/use-auth'
import { SignInScreenView } from './sign-in-view'
import { useSignInScreen } from './use-sign-in-screen'
import { Redirect } from 'expo-router'

export const SignInScreen = () => {
  const { isSignedIn, signInAccount } = useAuth()
  const { handleSignIn } = useSignInScreen({
    signInAccount,
  })

  if (isSignedIn) {
    return <Redirect href='/(protected)/vault/new' />
  }

  return <SignInScreenView onSignIn={handleSignIn} />
}
