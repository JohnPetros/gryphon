import { useCallback, useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { AccountsRepository } from '@/core/interfaces'
import type {
  NavigationProvider,
  StorageProvider,
  ToastProvider,
} from '@/core/interfaces/providers'
import type { AuthService } from '@/core/interfaces/services'

import { ROUTES, STORAGE_KEYS } from '@/constants'
import { Alert } from 'react-native'

type Params = {
  accountId: Id | null
  accountEmail: string
  isAccountSignedIn: boolean
  accountsRepository: AccountsRepository
  authService: AuthService
  storageProvider: StorageProvider
  navigationProvider: NavigationProvider
  toastProvider: ToastProvider
  signInAccount: (email: string, password: string) => Promise<void>
  signOutAccount: () => Promise<void>
  onSignIn: () => Promise<void>
}

export function useSignInScreen({
  accountId,
  accountEmail,
  isAccountSignedIn,
  accountsRepository,
  authService,
  storageProvider,
  toastProvider,
  navigationProvider,
  signInAccount,
  onSignIn,
}: Params) {
  const [shouldShowSignIn, setShouldShowSignIn] = useState(true)

  async function handleSignIn(email: string, password: string) {
    if (isAccountSignedIn && email === accountEmail) {
      await onSignIn()
      navigationProvider.navigate(ROUTES.vaultItens)
      return
    }

    await signInAccount(email, password)
    setShouldShowSignIn(false)
  }

  const handleAccountSignIn = useCallback(
    async (accountId: Id) => {
      if (shouldShowSignIn) return

      setShouldShowSignIn(true)

      try {
        const storedAccountId = await storageProvider.getItem(STORAGE_KEYS.accountId)
        const masterPassword = await storageProvider.getItem(STORAGE_KEYS.masterPassword)

        const response = await authService.fetchAccount(accountId)
        if (response.isFailure) {
          toastProvider.show(response.errorMessage, 'error')
          navigationProvider.navigate(ROUTES.auth.signUp, {
            step: '3',
            accountId: accountId.value,
            accountEmail,
          })
          return
        }

        const account = await accountsRepository.findById(accountId)
        if (!account) {
          await storageProvider.setItem(STORAGE_KEYS.accountId, accountId?.value)
          navigationProvider.navigate(ROUTES.dataImport)
          return
        }

        if (storedAccountId !== accountId?.value || !masterPassword) {
          await storageProvider.setItem(STORAGE_KEYS.accountId, accountId?.value)
          navigationProvider.navigate(ROUTES.dataImport)
          return
        }

        await onSignIn()
        navigationProvider.navigate(ROUTES.vaultItens)
      } catch (error) {
        console.error(error)
      }
    },
    [shouldShowSignIn],
  )

  useEffect(() => {
    if (accountId) handleAccountSignIn(accountId)
  }, [accountId])

  return {
    handleSignIn,
  }
}
