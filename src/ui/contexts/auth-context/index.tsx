import { createContext, type PropsWithChildren } from 'react'

import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuth } from '@/ui/hooks/use-auth'
import { useDatabase } from '@/ui/hooks/use-database'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useAuthContextProvider } from './use-auth-context-provider'
import type { AuthContextValue } from './auth-context-value'

export const AuthContext = createContext({} as AuthContextValue)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { jwt, signInAccount, signOutAccount } = useAuth()
  const cryptoProvider = useCryptoProvider()
  const navigationProvider = useNavigation()
  const storageProvider = useSecureStorage()
  const { accountsRepository } = useDatabase()
  const authContextValue = useAuthContextProvider({
    jwt,
    cryptoProvider,
    storageProvider,
    navigationProvider,
    accountsRepository,
    signIn: signInAccount,
    signOut: signOutAccount,
  })

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
