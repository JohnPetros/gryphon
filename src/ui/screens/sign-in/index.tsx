import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { SignInScreenView } from './sign-in-view'
import { useSignInScreen } from './use-sign-in-screen'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useDatabase } from '@/ui/hooks/use-database'
import { useAuth } from '@/ui/hooks/use-auth'
import { useRest } from '@/ui/hooks/use-rest'

export const SignInScreen = () => {
  const { loadAccount, signInAccount, updateAccount } = useAuthContext()
  const { accountId, isSignedIn } = useAuth()
  const navigationProvider = useNavigation()
  const storageProvider = useSecureStorage()
  const { authService } = useRest()
  const { accountsRepository, synchronizeDatabase } = useDatabase()
  const { handleSignIn } = useSignInScreen({
    accountId,
    isAccountSignedIn: isSignedIn,
    navigationProvider,
    accountsRepository,
    authService,
    storageProvider,
    signInAccount,
    onSignIn: async (account) => {
      if (account) updateAccount(account)
      await loadAccount()
      await synchronizeDatabase()
    },
  })

  return <SignInScreenView onSignIn={handleSignIn} />
}
