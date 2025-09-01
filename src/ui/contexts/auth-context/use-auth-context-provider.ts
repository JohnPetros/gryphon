import { Account } from '@/core/domain/entities/account'
import type { CryptoProvider } from '@/core/interfaces'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useSecureStore } from '@/ui/hooks/use-secure-store'
import { useMemo, useState } from 'react'

type Params = {
  jwt: string | null
  cryptoProvider: CryptoProvider
}

export function useAuthContextProvider({ cryptoProvider }: Params) {
  const [account, setAccount] = useState<Account | null>(null)
  const [encryptionKey, setEncryptionKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const secureStore = useSecureStore()
  const navigation = useNavigation()

  const contextValue = useMemo(() => {
    async function createAccount(email: string, masterPassword: string) {
      setIsLoading(true)
      try {
        const encryptionSalt = await cryptoProvider.generateSalt()
        const encryptionKey = await cryptoProvider.deriveKey(
          masterPassword,
          encryptionSalt,
        )
        setEncryptionKey(encryptionKey)
        setAccount(Account.create({ email, encryptionSalt }))
        await secureStore.setItem('masterPassword', masterPassword)
        navigation.navigate('/(protected)/vaunt-itens')
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    return {
      account,
      isLoading,
      encryptionKey,
      createAccount,
    }
  }, [
    account,
    isLoading,
    encryptionKey,
    secureStore.setItem,
    navigation.navigate,
    cryptoProvider,
  ])

  return contextValue
}
