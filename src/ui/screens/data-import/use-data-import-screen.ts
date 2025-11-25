import { useEffect, type RefObject } from 'react'

import type { NavigationProvider, StorageProvider } from '@/core/interfaces/providers'

import { STORAGE_KEYS } from '@/constants/storage-keys'
import { ROUTES } from '@/constants'
import type { MasterPasswordConfirmationDialogRef } from '../../components/master-password-confirmation-dialog/types'

type Params = {
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  storageProvider: StorageProvider
  navigationProvider: NavigationProvider
  onCorrectPasswordSubmit: (masterPassword: string) => Promise<void>
  onDialogOpen: () => Promise<void>
}

export function useDataImportScreen({
  masterPasswordConfirmationDialogRef,
  storageProvider,
  navigationProvider,
  onCorrectPasswordSubmit,
  onDialogOpen,
}: Params) {
  async function handlePasswordSubmit(masterPassword: string) {
    try {
      masterPasswordConfirmationDialogRef.current?.close()
      await onCorrectPasswordSubmit(masterPassword)
      await storageProvider.setItem(STORAGE_KEYS.masterPassword, masterPassword)
      setTimeout(() => {
        navigationProvider.navigate(ROUTES.vaultItens)
      }, 2500)
    } catch (error) {
      console.error('Error on data import screen', error)
    }
  }

  useEffect(() => {
    masterPasswordConfirmationDialogRef.current?.open()
    onDialogOpen()
  }, [])

  return { handlePasswordSubmit }
}
