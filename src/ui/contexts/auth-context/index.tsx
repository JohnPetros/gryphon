import { createContext, type PropsWithChildren } from 'react'

import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuth } from '@/ui/hooks/use-auth'
import { useDatabase } from '@/ui/hooks/use-database'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useAuthContextProvider } from './use-auth-context-provider'
import type { AuthContextValue } from './auth-context-value'
import { useRest } from '@/ui/hooks/use-rest'
import { useNotification } from '@/ui/hooks/use-notification'

export const AuthContext = createContext({} as AuthContextValue)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { jwt, accountId, isSignedIn, signInAccount, signOutAccount } = useAuth()
  const { authService } = useRest()
  const { accountsRepository, synchronizeDatabase } = useDatabase()
  const { login } = useNotification()
  const cryptoProvider = useCryptoProvider()
  const navigationProvider = useNavigation()
  const storageProvider = useSecureStorage()
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
    onUpdateAccount: synchronizeDatabase,
    onLoadAccount: login,
  })

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
