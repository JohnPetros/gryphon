import { useEffect, useState, type RefObject } from 'react'

import type { NavigationProvider, StorageProvider } from '@/core/interfaces/providers'

import { STORAGE_KEYS } from '@/constants/storage-keys'
import { ROUTES } from '@/constants'
import type { MasterPasswordConfirmationDialogRef } from '../../components/master-password-confirmation-dialog/types'
import type { Account } from '@/core/domain/entities'

type Params = {
  account: Account | null
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  storageProvider: StorageProvider
  navigationProvider: NavigationProvider
  onCorrectPasswordSubmit: (masterPassword: string) => Promise<void>
  onDialogOpen: () => Promise<void>
}

export function useDataImportScreen({
  account,
  masterPasswordConfirmationDialogRef,
  storageProvider,
  navigationProvider,
  onCorrectPasswordSubmit,
  onDialogOpen,
}: Params) {
  const [isImporting, setIsImporting] = useState(false)

  async function handlePasswordSubmit(masterPassword: string) {
    if (!account) return
    setIsImporting(true)

    try {
      await onCorrectPasswordSubmit(masterPassword)
      await storageProvider.setItem(STORAGE_KEYS.masterPassword, masterPassword)
      await storageProvider.setItem(STORAGE_KEYS.accountId, account.id.value)
      masterPasswordConfirmationDialogRef.current?.close()
      setTimeout(() => {
        setIsImporting(false)
        navigationProvider.navigate(ROUTES.vaultItens)
      }, 2500)
    } catch (error) {
      console.error('Error on data import screen', error)
    }
  }

  useEffect(() => {
    onDialogOpen()
  }, [])

  useEffect(() => {
    if (account) {
      masterPasswordConfirmationDialogRef.current?.open()
      return
    }
    navigationProvider.navigate(ROUTES.auth.signIn)
  }, [account])

  return {
    isImporting,
    handlePasswordSubmit,
  }
}
