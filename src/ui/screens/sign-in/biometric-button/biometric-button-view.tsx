import { Icon } from '@/ui/components/icon'
import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'

type Props = {
  isBiometricEnabled: boolean
  onPress: () => void
}

export const BiometricButtonView = ({ onPress, isBiometricEnabled }: Props) => {
  // if (!isBiometricEnabled) return null

  return (
    <Pressable onPress={onPress}>
      <Box className='border border-accent rounded-full p-3'>
        <Icon name='biometric' color='accent' size={48} />
      </Box>
    </Pressable>
  )
}
