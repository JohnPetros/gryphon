import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { BiometricButtonView } from './biometric-button-view'
import { useBiometricButton } from './use-biometric-button'
import { useAuth } from '@/ui/hooks/use-auth'

export const BiometricButton = () => {
  const storageProvider = useSecureStorage()
  const navigationProvider = useNavigation()
  const { isSignedIn } = useAuth()
  const { isBiometricEnable, isSuccess, isFailure, handlePress } = useBiometricButton({
    isSignedIn: isSignedIn ?? false,
    storageProvider,
    navigationProvider,
  })

  return (
    <BiometricButtonView
      isBiometricEnabled={isBiometricEnable}
      isSuccess={isSuccess}
      isFailure={isFailure}
      onPress={handlePress}
    />
  )
}
