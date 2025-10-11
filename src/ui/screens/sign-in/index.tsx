import { useAuth } from '@/ui/hooks/use-auth'
import { SignInScreenView } from './sign-in-view'
import { useSignInScreen } from './use-sign-in-screen'
import { Redirect } from 'expo-router'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useDatabase } from '@/ui/hooks/use-database'

export const SignInScreen = () => {
  const { isSignedIn } = useAuth()
  const { signInAccount } = useAuthContext()
  const { synchronizeDatabase } = useDatabase()
  const { handleSignIn } = useSignInScreen({
    signInAccount,
    onSignIn: synchronizeDatabase,
  })

  if (isSignedIn) {
    return <Redirect href='/(protected)/(tabs)/vault-itens' />
  }

  return <SignInScreenView onSignIn={handleSignIn} />
}
