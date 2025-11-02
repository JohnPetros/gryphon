import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { BiometricButtonView } from './biometric-button-view'
import { useBiometricButton } from './use-biometric-button'
import { useAuth } from '@/ui/hooks/use-auth'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

export const BiometricButton = () => {
  const storageProvider = useSecureStorage()
  const navigationProvider = useNavigation()
  const { isSignedIn } = useAuth()
  const { account } = useAuthContext()
  const { isBiometricEnable, isSuccess, isFailure, handlePress } = useBiometricButton({
    isSignedIn: isSignedIn ?? false,
    storageProvider,
    navigationProvider,
  })

  return (
    <BiometricButtonView
      isBiometricEnabled={isBiometricEnable && Boolean(account)}
      isSuccess={isSuccess}
      isFailure={isFailure}
      onPress={handlePress}
    />
  )
}
