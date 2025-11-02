import { useCallback, useEffect, useMemo, useState } from 'react'

import { Account } from '@/core/domain/entities/account'
import { Id } from '@/core/domain/structures'
import type { CryptoProvider, AccountsRepository } from '@/core/interfaces'

import { CLIENT_ENV, ROUTES, STORAGE_KEYS } from '@/constants'
import { useToast } from '@/ui/hooks/use-toast'
import type { AuthContextValue } from './auth-context-value'
import type { NavigationProvider, StorageProvider } from '@/core/interfaces/providers'
import type { AuthService } from '@/core/interfaces/services'

type Params = {
  jwt: string | null
  accountId: Id | null
  cryptoProvider: CryptoProvider
  accountsRepository: AccountsRepository
  navigationProvider: NavigationProvider
  storageProvider: StorageProvider
  authService: AuthService
  isAccountSignedIn: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<boolean>
  onSignIn: () => Promise<void>
}

export function useAuthContextProvider({
  cryptoProvider,
  accountsRepository,
  storageProvider,
  navigationProvider,
  authService,
  signOut,
  signIn,
}: Params) {
  const [account, setAccount] = useState<Account | null>(null)
  const [encryptionKey, setEncryptionKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const signInAccount = useCallback(
    async (email: string, password: string) => {
      await signOut()
      const isSuccess = await signIn(email, password)

      if (!isSuccess) {
        toast.show('E-mail ou senha incorretos', 'error')
        return
      }
    },
    [signIn, signOut, toast.show],
  )

  const signOutAccount = useCallback(async () => {
    signOut()
    setAccount(null)
    await storageProvider.deleteItem(STORAGE_KEYS.accountId)
    navigationProvider.navigate(ROUTES.auth.signIn)
  }, [signOut, navigationProvider.navigate, storageProvider.deleteItem])

  const createEncryptionKey = useCallback(
    async (masterPassword: string, encryptionSalt: string) => {
      const encryptionKey = await cryptoProvider.deriveKey(masterPassword, encryptionSalt)
      setEncryptionKey(encryptionKey)
      return encryptionKey
    },
    [cryptoProvider.deriveKey],
  )

  const loadAccount = useCallback(async () => {
    const storedAccountId = await storageProvider.getItem(STORAGE_KEYS.accountId)
    console.log({ storedAccountId })
    if (!storedAccountId) {
      signOutAccount()
      return
    }
    const accountId = Id.create(storedAccountId)
    let account = await accountsRepository.findById(accountId)

    if (!account) {
      try {
        const response = await authService.fetchAccount(accountId)
        console.log('loadAccount', { response })
        if (response.isFailure) {
          signOutAccount()
          return
        }
        account = Account.create(response.body)
      } catch (error) {
        console.error('Error fetching account', error)
      }
    }

    await storageProvider.setItem(STORAGE_KEYS.acountEmail, account.email)
    setAccount(account)

    const masterPassword = await storageProvider.getItem(STORAGE_KEYS.masterPassword)
    console.log({ masterPassword, salt: account.encryptionSalt })
    if (!masterPassword) return
    createEncryptionKey(masterPassword, account.encryptionSalt)
  }, [
    createEncryptionKey,
    signOutAccount,
    storageProvider.getItem,
    accountsRepository.findById,
  ])

  const updateAccount = useCallback(async (account: Account) => {
    setAccount(Account.create(account.dto))
  }, [])

  const contextValue: AuthContextValue = useMemo(() => {
    async function createAccount(
      accountId: string,
      email: string,
      masterPassword: string,
    ) {
      setIsLoading(true)
      try {
        const encryptionSalt = await cryptoProvider.generateSalt()
        const encryptionKey = await createEncryptionKey(masterPassword, encryptionSalt)

        const kcv = await cryptoProvider.encrypt(CLIENT_ENV.kcvText, encryptionKey)

        const account = Account.create({
          id: accountId,
          email,
          encryptionSalt,
          isBiometryActivated: false,
          minimumPasswordStrength: 3,
          autoLockTimeout: 60 * 5,
          isMasterPasswordRequired: true,
          kcv,
        })
        setAccount(account)

        await storageProvider.setItem(STORAGE_KEYS.masterPassword, masterPassword)
        await storageProvider.setItem(STORAGE_KEYS.accountId, accountId)
        await storageProvider.setItem(STORAGE_KEYS.acountEmail, email)

        await accountsRepository.add(account)
        await signOut()

        navigationProvider.navigate(ROUTES.auth.signIn)
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
      updateAccount,
      loadAccount,
    }
  }, [
    account,
    isLoading,
    encryptionKey,
    accountsRepository,
    cryptoProvider,
    storageProvider.setItem,
    navigationProvider.navigate,
    signInAccount,
    signOutAccount,
    updateAccount,
    createEncryptionKey,
    signOut,
  ])

  useEffect(() => {
    loadAccount()
  }, [])

  return contextValue
}
