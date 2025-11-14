import { ScreenContainer } from 'react-native-screens'

import { ScreenTitle } from '@/ui/components/screen-title'
import { Text } from '@/ui/gluestack/text'
import { Box } from '@/ui/gluestack/box'
import { GoogleBackupButton } from './google-backup-button'

type Props = {
  accountEmail: string
  onSignIn: (accountEmail: string) => void
}

export const BackupScreenView = ({ accountEmail, onSignIn }: Props) => {
  return (
    <ScreenContainer>
      <ScreenTitle>Backup</ScreenTitle>

      <Text className='mt-6'>
        Faça backups dos seus dados no Google Drive. Você poderá restaurá-los. Seus dados
        também serão armazenadas no armazenamento interno de seu aparelho. O sistema gera
        o backup semanalmente e automaticamente.
      </Text>

      <Box className='mt-6'>
        <GoogleBackupButton onSignIn={onSignIn} />
      </Box>

      {accountEmail && (
        <Box className='mt-6'>
          <Text>Conta Google</Text>
          <Text>{accountEmail}</Text>
        </Box>
      )}
    </ScreenContainer>
  )
}
