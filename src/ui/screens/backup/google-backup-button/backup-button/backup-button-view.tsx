import { ActivityIndicator, Image } from 'react-native'
import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  isUploading: boolean
  onPress: () => void
}

export const BackupButtonView = ({ isUploading, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} disabled={isUploading}>
      <Box className='rounded-md border border-accent px-6 py-3'>
        {isUploading ? (
          <Box className='justify-center items-center'>
            <ActivityIndicator size='small' color='accent' />
          </Box>
        ) : (
          <Box className='flex-row items-center gap-3'>
            <Image
              source={require('../../../../../assets/images/google-drive.png')}
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
              alt=''
            />
            <Text className='text-accent text-xl'>Fazer backup no Google Drive</Text>
          </Box>
        )}
      </Box>
    </Pressable>
  )
}
