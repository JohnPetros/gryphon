import { Icon } from '@/ui/components/icon'
import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  isBiometricEnabled: boolean
  isSuccess: boolean
  isFailure: boolean
  onPress: () => void
}

export const BiometricButtonView = ({
  onPress,
  isBiometricEnabled,
  isSuccess,
  isFailure,
}: Props) => {
  if (!isBiometricEnabled) return null

  return (
    <Pressable onPress={onPress}>
      <Box
        className={mergeClassNames(
          'border rounded-full p-3',
          isSuccess ? 'border-primary' : isFailure ? 'border-danger' : 'border-accent',
        )}
      >
        <Icon
          name='biometric'
          size={48}
          color={isSuccess ? 'primary' : isFailure ? 'danger' : 'accent'}
        />
      </Box>
    </Pressable>
  )
}
