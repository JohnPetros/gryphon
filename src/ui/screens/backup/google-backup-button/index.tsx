import { useDatetime } from '@/ui/hooks/use-datetime'
import { useRest } from '@/ui/hooks/use-rest'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { GoogleBackupView } from './google-backup-view'
import { useGoogleBackup } from './use-google-backup'

export const GoogleBackup = () => {
  const storageProvider = useSecureStorage()
  const datetimeProvider = useDatetime()
  const { databaseService } = useRest()
  const { account } = useAuthContext()
  const {
    accessToken,
    googleAccountEmail,
    isLoadingAccessToken,
    handleSignInButtonPress,
    handleSignOutButtonPress,
  } = useGoogleBackup({
    accountId: account?.id ?? null,
    storageProvider,
    datetimeProvider,
    databaseService,
  })

  return (
    <GoogleBackupView
      accessToken={accessToken}
      googleAccountEmail={googleAccountEmail}
      isLoadingAccessToken={isLoadingAccessToken}
      onSignInButtonPress={handleSignInButtonPress}
      onSignOutButtonPress={handleSignOutButtonPress}
    />
  )
}
