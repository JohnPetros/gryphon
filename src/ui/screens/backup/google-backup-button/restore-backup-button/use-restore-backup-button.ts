import { type RefObject, useState } from 'react'

import type { MasterPasswordConfirmationDialogRef } from '@/ui/components/master-password-confirmation-dialog/types'
import type {
  CryptoProvider,
  DatabaseProvider,
  ToastProvider,
} from '@/core/interfaces/providers'
import type { FileStorageService } from '@/core/interfaces/services'

type Params = {
  encryptionKey: string
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  toastProvider: ToastProvider
  cryptoProvider: CryptoProvider
  databaseProvider: DatabaseProvider
  fileStorageService: FileStorageService
}

export function useRestoreBackupButton({
  encryptionKey,
  masterPasswordConfirmationDialogRef,
  toastProvider,
  databaseProvider,
  cryptoProvider,
  fileStorageService,
}: Params) {
  const [isRestoring, setIsRestoring] = useState(false)

  async function handleCorrectMasterPasswordSubmit() {
    masterPasswordConfirmationDialogRef.current?.close()
    setIsRestoring(true)

    const response = await fileStorageService.read('gryphon-backup')
    if (response.isFailure) toastProvider.show(response.errorMessage, 'error')

    if (response.isSuccessful) {
      const data = cryptoProvider.decrypt(response.body, encryptionKey)
      if (!data) {
        toastProvider.show('Arquivo de backup inválido para esta conta.', 'error')
        return
      }
      const databaseChanges = JSON.parse(data)
      await databaseProvider.applyChanges(databaseChanges, false)
    }

    setIsRestoring(false)
  }

  async function handlePress() {
    masterPasswordConfirmationDialogRef.current?.open()
  }

  return {
    isRestoring,
    handlePress,
    handleCorrectMasterPasswordSubmit,
  }
}
