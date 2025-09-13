import { useCallback, useEffect, useMemo, useState } from 'react'

import { Account } from '@/core/domain/entities/account'
import { Id } from '@/core/domain/structures'
import type { CryptoProvider, AccountsRepository } from '@/core/interfaces'

import { ROUTES, STORAGE_KEYS } from '@/constants'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useSecureStore } from '@/ui/hooks/use-secure-store'
import type { AuthContextValue } from './auth-context-value'
import { useToast } from '@/ui/hooks/use-toast'

type Params = {
  jwt: string | null
  cryptoProvider: CryptoProvider
  accountsRepository: AccountsRepository
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<boolean>
}

export function useAuthContextProvider({
  cryptoProvider,
  accountsRepository,
  signOut,
  signIn,
}: Params) {
  const [account, setAccount] = useState<Account | null>(null)
  const [encryptionKey, setEncryptionKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const secureStore = useSecureStore()
  const navigation = useNavigation()
  const toast = useToast()

  const signInAccount = useCallback(
    async (email: string, password: string) => {
      const isSuccess = await signIn(email, password)

      if (!isSuccess) {
        toast.show('E-mail ou senha incorretos', 'error')
        return
      }

      const account = await accountsRepository.findByEmail(email)

      if (!account) {
        toast.show('E-mail ou senha incorretos', 'error')
        await signOut()
        return
      }

      setAccount(account)
      await secureStore.setItem(STORAGE_KEYS.accountId, account.id.value)
      navigation.navigate(ROUTES.vaultItens)
    },
    [
      signIn,
      secureStore.setItem,
      navigation.navigate,
      toast.show,
      accountsRepository.findByEmail,
    ],
  )

  const signOutAccount = useCallback(async () => {
    signOut()
    setAccount(null)
    await secureStore.deleteItem(STORAGE_KEYS.accountId)
    navigation.navigate(ROUTES.auth.signIn)
  }, [signOut, navigation.navigate, secureStore.deleteItem])

  const createEncryptionKey = useCallback(
    async (masterPassword: string, encryptionSalt: string) => {
      const encryptionKey = await cryptoProvider.deriveKey(masterPassword, encryptionSalt)
      setEncryptionKey(encryptionKey)
    },
    [cryptoProvider.deriveKey],
  )

  const loadAccount = useCallback(async () => {
    const accountId = await secureStore.getItem(STORAGE_KEYS.accountId)
    if (!accountId) {
      signOutAccount()
      return
    }

    const account = await accountsRepository.findById(Id.create(accountId))

    if (!account) {
      signOutAccount()
      return
    }

    const masterPassword = await secureStore.getItem(STORAGE_KEYS.masterPassword)
    if (!masterPassword) return

    createEncryptionKey(masterPassword, account.encryptionSalt)
    setAccount(account)
  }, [
    createEncryptionKey,
    signOutAccount,
    secureStore.getItem,
    accountsRepository.findById,
  ])

  const contextValue: AuthContextValue = useMemo(() => {
    async function createAccount(
      accountId: string,
      email: string,
      masterPassword: string,
    ) {
      setIsLoading(true)
      try {
        const encryptionSalt = await cryptoProvider.generateSalt()
        await createEncryptionKey(masterPassword, encryptionSalt)

        const account = Account.create({
          id: accountId,
          email,
          encryptionSalt,
          isBiometryActivated: false,
          minimumPasswordStrength: 'medium',
          minimumAppLockTimeInSeconds: 0,
          isMasterPasswordRequired: true,
        })
        setAccount(account)

        await secureStore.setItem(STORAGE_KEYS.masterPassword, masterPassword)
        await secureStore.setItem(STORAGE_KEYS.accountId, accountId)

        await accountsRepository.add(account)
        await signOut()

        navigation.navigate(ROUTES.auth.signIn)
      } catch (error) {
        console.error('Error creating account', error)
      } finally {
        setIsLoading(false)
      }
    }

    return {
      account,
      isLoading,
      encryptionKey,
      signInAccount,
      signOutAccount,
      createAccount,
      createEncryptionKey,
    }
  }, [
    account,
    isLoading,
    encryptionKey,
    secureStore.setItem,
    navigation.navigate,
    signInAccount,
    signOutAccount,
    createEncryptionKey,
    accountsRepository,
    cryptoProvider,
  ])

  useEffect(() => {
    loadAccount()
  }, [])

  return contextValue
}
