import { useRef } from 'react'

import { RestoreBackupButtonView } from './restore-backup-button-view'
import { useRestoreBackupButton } from './use-restore-backup-button'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { GDriveFileStorageService } from '@/rest/services'
import { useToast } from '@/ui/hooks/use-toast'
import { useDatabaseProvider } from '@/ui/hooks/use-database-provider'
import type { MasterPasswordConfirmationDialogRef } from '@/ui/components/master-password-confirmation-dialog/types'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'

type Props = {
  accessToken: string
}

export const RestoreBackupButton = ({ accessToken }: Props) => {
  const { encryptionKey } = useAuthContext()
  const toastProvider = useToast()
  const databaseProvider = useDatabaseProvider()
  const cryptoProvider = useCryptoProvider()
  const masterPasswordConfirmationDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const { handlePress, handleCorrectMasterPasswordSubmit, isRestoring } =
    useRestoreBackupButton({
      encryptionKey,
      masterPasswordConfirmationDialogRef,
      toastProvider,
      cryptoProvider,
      databaseProvider,
      fileStorageService: GDriveFileStorageService(accessToken),
    })

  return (
    <RestoreBackupButtonView
      masterPasswordConfirmationDialogRef={masterPasswordConfirmationDialogRef}
      isRestoring={isRestoring}
      onPress={handlePress}
      onCorrectMasterPasswordSubmit={handleCorrectMasterPasswordSubmit}
    />
  )
}
