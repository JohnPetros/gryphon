import { ScreenTitle } from '@/ui/components/screen-title'
import { Text } from '@/ui/gluestack/text'
import { Box } from '@/ui/gluestack/box'
import { ScreenContainer } from '@/ui/components/screen-container'
import { PreviousScreenButton } from '@/ui/components/previous-screen-button'
import { GoogleBackup } from './google-backup-button'

type Props = {
  isOffline: boolean
}

export const BackupScreenView = ({ isOffline }: Props) => {
  return (
    <ScreenContainer>
      <PreviousScreenButton />

      <Box className='mt-6'>
        <ScreenTitle>Backup</ScreenTitle>

        <Text className='mt-6 text-neutral text-lg'>
          Faça backups dos seus dados no Google Drive. Você poderá restaurá-los. Seus
          dados também serão armazenados no armazenamento interno de seu aparelho. O
          sistema gera o backup semanalmente e automaticamente.
        </Text>

        <Box className='mt-6'>
          <GoogleBackup />
        </Box>
      </Box>
    </ScreenContainer>
  )
}
