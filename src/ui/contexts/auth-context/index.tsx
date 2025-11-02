import { createContext, type PropsWithChildren } from 'react'

import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuth } from '@/ui/hooks/use-auth'
import { useDatabase } from '@/ui/hooks/use-database'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useAuthContextProvider } from './use-auth-context-provider'
import type { AuthContextValue } from './auth-context-value'
import { useRest } from '@/ui/hooks/use-rest'

export const AuthContext = createContext({} as AuthContextValue)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { jwt, accountId, isSignedIn, signInAccount, signOutAccount } = useAuth()
  const cryptoProvider = useCryptoProvider()
  const navigationProvider = useNavigation()
  const storageProvider = useSecureStorage()
  const { authService } = useRest()
  const { accountsRepository, synchronizeDatabase } = useDatabase()

  const authContextValue = useAuthContextProvider({
    jwt,
    accountId,
    cryptoProvider,
    storageProvider,
    navigationProvider,
    accountsRepository,
    authService,
    isAccountSignedIn: isSignedIn,
    signIn: signInAccount,
    signOut: signOutAccount,
    onSignIn: synchronizeDatabase,
  })

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
