import { useCallback, useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { AccountsRepository } from '@/core/interfaces'
import type { NavigationProvider, StorageProvider } from '@/core/interfaces/providers'
import type { Account } from '@/core/domain/entities'

import { ROUTES, STORAGE_KEYS } from '@/constants'

type Params = {
  accountId: Id | null
  isAccountSignedIn: boolean
  accountsRepository: AccountsRepository
  storageProvider: StorageProvider
  navigationProvider: NavigationProvider
  signInAccount: (email: string, password: string) => Promise<void>
  onSignIn: (account: Account | null) => Promise<void>
}

export function useSignInScreen({
  accountId,
  isAccountSignedIn,
  accountsRepository,
  storageProvider,
  navigationProvider,
  signInAccount,
  onSignIn,
}: Params) {
  const [shouldShowSignIn, setShouldShowSignIn] = useState(true)

  async function handleSignIn(email: string, password: string) {
    const storedEmail = await storageProvider.getItem(STORAGE_KEYS.acountEmail)

    if (email === storedEmail && isAccountSignedIn) {
      await onSignIn(null)
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
        if (storedAccountId !== accountId?.value || !masterPassword) {
          await storageProvider.setItem(STORAGE_KEYS.accountId, accountId?.value)
          navigationProvider.navigate(ROUTES.dataImport)
          return
        }

        const account = await accountsRepository.findById(accountId)
        if (!account) {
          navigationProvider.navigate(ROUTES.dataImport)
          return
        }
        onSignIn(account)
        navigationProvider.navigate(ROUTES.vaultItens)
      } catch (error) {
        console.error(error)
      }
    },
    [
      shouldShowSignIn,
      accountsRepository.findById,
      storageProvider.getItem,
      storageProvider.setItem,
      navigationProvider.navigate,
      onSignIn,
    ],
  )

  useEffect(() => {
    if (accountId) handleAccountSignIn(accountId)
  }, [accountId])

  return {
    handleSignIn,
  }
}
