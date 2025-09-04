import { createContext, type PropsWithChildren } from 'react'

import { useAuthContextProvider } from './use-auth-context-provider'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuth } from '@/ui/hooks/useAuth'
import type { AuthContextValue } from './auth-context-value'

export const AuthContext = createContext({} as AuthContextValue)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { jwt } = useAuth()
  const cryptoProvider = useCryptoProvider()
  const authContextValue = useAuthContextProvider({
    jwt,
    cryptoProvider,
  })

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
