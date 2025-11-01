import { useAuth } from '@/ui/hooks/use-auth'
import { SignInScreenView } from './sign-in-view'
import { useSignInScreen } from './use-sign-in-screen'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useDatabase } from '@/ui/hooks/use-database'
import { useNavigation } from '@/ui/hooks/use-navigation'

export const SignInScreen = () => {
  const navigationProvider = useNavigation()
  const { isSignedIn } = useAuth()
  const { signInAccount } = useAuthContext()
  const { synchronizeDatabase } = useDatabase()
  const { handleSignIn } = useSignInScreen({
    isSignedIn: isSignedIn ?? false,
    navigationProvider,
    signInAccount,
    onSignIn: synchronizeDatabase,
  })

  return <SignInScreenView onSignIn={handleSignIn} />
}
