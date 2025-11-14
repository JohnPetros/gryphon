import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import { Image } from '@/ui/gluestack/image'
import { Text } from '@/ui/gluestack/text'

type Props = {
  isSignedIn: boolean
  onSignInButtonPress: () => void
  onBackupButtonPress: () => void
}

export const GoogleBackupButtonView = ({
  isSignedIn,
  onBackupButtonPress,
  onSignInButtonPress,
}: Props) => {
  if (!isSignedIn) {
    return (
      <Pressable onPress={onSignInButtonPress}>
        <Box className='flex-row items-center rounded-md border-accent px-6 py-3'>
          <Image
            source={require('../../../../assets/images/google.svg')}
            style={{ width: 120, height: 120 }}
            resizeMode='contain'
          />
          <Text className='text-accent'>Fazer login no Google</Text>
        </Box>
      </Pressable>
    )
  }

  return (
    <Pressable onPress={onBackupButtonPress}>
      <Box className='flex-row items-center rounded-md border-accent px-6 py-3'>
        <Image
          source={require('../../../../assets/images/google-drive.svg')}
          style={{ width: 120, height: 120 }}
          resizeMode='contain'
        />
        <Text className='text-accent'>Fazer backup no Google Drive</Text>
      </Box>
    </Pressable>
  )
}
