import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { GoogleBackupButtonView } from './google-backup-button-view'
import { useGoogleBackupButton } from './use-google-backup-button'

type Props = {
  onSignIn: (accountEmail: string) => void
}

export const GoogleBackupButton = ({ onSignIn }: Props) => {
  const storageProvider = useSecureStorage()
  const { isSignedIn, handleBackupButtonPress, handleSignInButtonPress } =
    useGoogleBackupButton({ storageProvider, onSignIn })

  return (
    <GoogleBackupButtonView
      isSignedIn={isSignedIn}
      onSignInButtonPress={handleSignInButtonPress}
      onBackupButtonPress={handleBackupButtonPress}
    />
  )
}
