import { BackupScreenView } from './backup-screen-view'
import { useBackupScreen } from './use-backup-screen'

export const BackupScreen = () => {
  const { accountEmail, handleSignIn } = useBackupScreen()

  return <BackupScreenView accountEmail={accountEmail} onSignIn={handleSignIn} />
}
