import { useCallback, useEffect, useMemo, useState } from 'react'

import { Account } from '@/core/domain/entities/account'
import { Vaunt } from '@/core/domain/entities/vaunt'
import { Id } from '@/core/domain/structures'
import type {
  CryptoProvider,
  VauntsRepository,
  AccountsRepository,
} from '@/core/interfaces'

import { ROUTES, STORAGE_KEYS } from '@/constants'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useSecureStore } from '@/ui/hooks/use-secure-store'
import type { AuthContextValue } from './auth-context-value'

type Params = {
  jwt: string | null
  cryptoProvider: CryptoProvider
  vauntsRepository: VauntsRepository
  accountsRepository: AccountsRepository
}

export function useAuthContextProvider({
  cryptoProvider,
  vauntsRepository,
  accountsRepository,
}: Params) {
  const [account, setAccount] = useState<Account | null>(null)
  const [encryptionKey, setEncryptionKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const secureStore = useSecureStore()
  const navigation = useNavigation()

  const createEncryptionKey = useCallback(
    async (masterPassword: string, encryptionSalt: string) => {
      const encryptionKey = await cryptoProvider.deriveKey(masterPassword, encryptionSalt)
      setEncryptionKey(encryptionKey)
    },
    [cryptoProvider.deriveKey],
  )

  const loadAccount = useCallback(async () => {
    const accountId = await secureStore.getItem(STORAGE_KEYS.accountId)
    if (!accountId) return

    const account = await accountsRepository.findById(Id.create(accountId))
    if (!account) return

    setAccount(account)

    secureStore.getItem(STORAGE_KEYS.masterPassword).then((masterPassword) => {
      if (!masterPassword) return
      createEncryptionKey(masterPassword, account.encryptionSalt)
    })
  }, [createEncryptionKey, secureStore.getItem, accountsRepository.findById])

  const contextValue: AuthContextValue = useMemo(() => {
    async function createAccount(id: string, email: string, masterPassword: string) {
      setIsLoading(true)
      try {
        const encryptionSalt = await cryptoProvider.generateSalt()
        await createEncryptionKey(masterPassword, encryptionSalt)

        const account = Account.create({
          id,
          email,
          encryptionSalt,
          isBiometryActivated: false,
          minimumPasswordStrength: 'medium',
          minimumAppLockTimeInSeconds: 0,
          isMasterPasswordRequired: true,
        })
        const vaunt = Vaunt.create({
          title: 'Home',
          icon: 'home',
        })
        setAccount(account)

        await secureStore.setItem(STORAGE_KEYS.masterPassword, masterPassword)
        await secureStore.setItem(STORAGE_KEYS.accountId, account.id.value)
        await accountsRepository.add(account)
        await vauntsRepository.add(vaunt, account.id)

        navigation.navigate(ROUTES.vault.itens(account.id.value))
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
      createEncryptionKey,
    }
  }, [
    account,
    isLoading,
    encryptionKey,
    secureStore.setItem,
    navigation.navigate,
    createEncryptionKey,
    accountsRepository,
    vauntsRepository,
    cryptoProvider,
  ])

  useEffect(() => {
    console.log('loadAccount')
    loadAccount()
  }, [loadAccount])

  return contextValue
}
