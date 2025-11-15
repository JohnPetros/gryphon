import { useBackupButton } from './use-backup-button'
import { useDatetimeProvider } from '@/ui/hooks/use-datetime'
import { useRest } from '@/ui/hooks/use-rest'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { GDriveFileStorageService } from '@/rest/services'
import { useFileSystemProvider } from '@/ui/hooks/use-file-system-provider'
import { BackupButtonView } from './backup-button-view'
import { useToast } from '@/ui/hooks/use-toast'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'

type Props = {
  accessToken: string
}

export const BackupButton = ({ accessToken }: Props) => {
  const fileSystemProvider = useFileSystemProvider()
  const datetimeProvider = useDatetimeProvider()
  const cryptoProvider = useCryptoProvider()
  const toastProvider = useToast()
  const { databaseService } = useRest()
  const { account, encryptionKey } = useAuthContext()
  const { isUploading, handleBackupButtonPress } = useBackupButton({
    accountId: account?.id ?? null,
    encryptionKey,
    datetimeProvider,
    databaseService,
    fileSystemProvider,
    cryptoProvider,
    toastProvider,
    fileStorageService: GDriveFileStorageService(accessToken),
  })

  return <BackupButtonView isUploading={isUploading} onPress={handleBackupButtonPress} />
}
