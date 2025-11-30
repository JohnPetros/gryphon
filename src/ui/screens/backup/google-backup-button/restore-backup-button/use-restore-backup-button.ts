import { type RefObject, useEffect, useState } from 'react'

import type { MasterPasswordConfirmationDialogRef } from '@/ui/components/master-password-confirmation-dialog/types'
import type {
  CryptoProvider,
  DatabaseProvider,
  ToastProvider,
} from '@/core/interfaces/providers'
import type { FileStorageService } from '@/core/interfaces/services'
import { HTTP_STATUS_CODE } from '@/core/constants'
import { File } from '@/core/domain/entities/file'

type Params = {
  encryptionKey: string
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  toastProvider: ToastProvider
  cryptoProvider: CryptoProvider
  databaseProvider: DatabaseProvider
  fileStorageService: FileStorageService
  onReadBackupFile: (file: File) => void
}

export function useRestoreBackupButton({
  encryptionKey,
  masterPasswordConfirmationDialogRef,
  toastProvider,
  databaseProvider,
  cryptoProvider,
  fileStorageService,
  onReadBackupFile,
}: Params) {
  const [isRestoring, setIsRestoring] = useState(false)
  const [backupFile, setBackupFile] = useState<File | null>(null)

  async function readBackupFile() {
    const response = await fileStorageService.read('gryphon-backup')
    if (response.isFailure) {
      if (response.statusCode === HTTP_STATUS_CODE.notFound) {
        toastProvider.show('Arquivo de backup não encontrado.', 'error')
      }
      toastProvider.show(response.errorMessage, 'error')
      return
    }
    const file = File.create(response.body)
    setBackupFile(file)
    onReadBackupFile(file)
  }

  async function handleCorrectMasterPasswordSubmit() {
    masterPasswordConfirmationDialogRef.current?.close()
    setIsRestoring(true)
    if (!backupFile) return

    try {
      const response = await fileStorageService.getFileById(backupFile.id)
      const data = cryptoProvider.decrypt(response.body, encryptionKey)
      if (!data) {
        toastProvider.show('Arquivo de backup inválido para esta conta.', 'error')
        return
      }
      const databaseChanges = JSON.parse(data)
      await databaseProvider.applyChanges(databaseChanges, false)
    } catch (error) {
      console.warn(error)
    } finally {
      setIsRestoring(false)
    }
  }

  async function handlePress() {
    masterPasswordConfirmationDialogRef.current?.open()
  }

  useEffect(() => {
    readBackupFile()
  }, [])

  return {
    isRestoring,
    handlePress,
    handleCorrectMasterPasswordSubmit,
  }
}
