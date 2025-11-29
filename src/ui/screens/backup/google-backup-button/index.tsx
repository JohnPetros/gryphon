import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { GoogleBackupView } from './google-backup-view'
import { useGoogleBackup } from './use-google-backup'

export const GoogleBackup = () => {
  const storageProvider = useSecureStorage()
  const {
    accessToken,
    googleAccountEmail,
    isLoadingAccessToken,
    lastReadBackupFileAt,
    handleReadBackupFile,
    handleSignInButtonPress,
    handleSignOutButtonPress,
  } = useGoogleBackup({
    storageProvider,
  })

  return (
    <GoogleBackupView
      accessToken={accessToken}
      googleAccountEmail={googleAccountEmail}
      isLoadingAccessToken={isLoadingAccessToken}
      lastReadBackupFileAt={lastReadBackupFileAt}
      onReadBackupFile={handleReadBackupFile}
      onSignInButtonPress={handleSignInButtonPress}
      onSignOutButtonPress={handleSignOutButtonPress}
    />
  )
}
