import type { Id } from '@/core/domain/structures'
import type {
  CryptoProvider,
  DatetimeProvider,
  FileSystemProvider,
  ToastProvider,
} from '@/core/interfaces/providers'
import type { DatabaseService, FileStorageService } from '@/core/interfaces/services'
import { useState } from 'react'

type Params = {
  accountId: Id | null
  encryptionKey: string
  fileSystemProvider: FileSystemProvider
  datetimeProvider: DatetimeProvider
  toastProvider: ToastProvider
  cryptoProvider: CryptoProvider
  fileStorageService: FileStorageService
  databaseService: DatabaseService
}

export function useBackupButton({
  accountId,
  encryptionKey,
  fileSystemProvider,
  datetimeProvider,
  toastProvider,
  cryptoProvider,
  fileStorageService,
  databaseService,
}: Params) {
  const [isUploading, setIsUploading] = useState(false)

  async function handleBackupButtonPress() {
    if (!accountId) return

    setIsUploading(true)
    const databaseResponse = await databaseService.pullDatabaseChanges(accountId)
    const currentTimestamp = datetimeProvider.getCurrentTimestamp()

    const fileName = `gryphon-backup-${currentTimestamp}.txt`
    const data = await cryptoProvider.encrypt(databaseResponse.body, encryptionKey)
    const { fileUri } = await fileSystemProvider.write(fileName, data)

    const fileStorageResponse = await fileStorageService.upload(fileUri)
    if (fileStorageResponse.isFailure)
      toastProvider.show(fileStorageResponse.errorMessage, 'error')

    setIsUploading(false)
  }

  return {
    isUploading,
    handleBackupButtonPress,
  }
}
