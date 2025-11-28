import { Image } from 'react-native'

import type { File } from '@/core/domain/entities/file'

import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { LoadingDialog } from '@/ui/components/loading-dialog'
import { BackupButton } from './backup-button'
import { RestoreBackupButton } from './restore-backup-button'
import { useDatetime } from '@/ui/hooks/use-datetime'

type Props = {
  googleAccountEmail: string
  accessToken: string
  isLoadingAccessToken: boolean
  lastReadBackupFileAt: Date | null
  onSignInButtonPress: () => void
  onSignOutButtonPress: () => void
  onReadBackupFile: (file: File) => void
}

export const GoogleBackupView = ({
  accessToken,
  googleAccountEmail,
  isLoadingAccessToken,
  lastReadBackupFileAt,
  onSignInButtonPress,
  onSignOutButtonPress,
  onReadBackupFile,
}: Props) => {
  const { formatDate } = useDatetime()
  return (
    <Box>
      <LoadingDialog
        isOpen={isLoadingAccessToken}
        message='Tentando carregar sua conta Google...'
      />

      <Box className='gap-6'>
        {accessToken && <BackupButton accessToken={accessToken} />}
        {accessToken && (
          <RestoreBackupButton
            accessToken={accessToken}
            onReadBackupFile={onReadBackupFile}
          />
        )}
      </Box>

      {accessToken && lastReadBackupFileAt && (
        <Box className='mt-6'>
          <Text className='text-md'>
            Último backup: {formatDate(lastReadBackupFileAt)}
          </Text>
        </Box>
      )}

      {!accessToken && (
        <Pressable onPress={onSignInButtonPress}>
          <Box className='flex-row items-center gap-3 rounded-md border border-accent px-6 py-3'>
            <Image
              source={require('../../../../assets/images/google.png')}
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
              alt=''
            />
            <Text className='text-accent text-xl'>Conectar Conta Google</Text>
          </Box>
        </Pressable>
      )}

      {googleAccountEmail && (
        <Box className='mt-12'>
          <Text className='text-neutral text-lg'>Conta Google</Text>
          <Text className='text-accent text-xl'>{googleAccountEmail}</Text>
          <Pressable onPress={onSignOutButtonPress} className='mt-6'>
            <Text className='text-primary underline'>Sair da conta</Text>
          </Pressable>
        </Box>
      )}
    </Box>
  )
}
