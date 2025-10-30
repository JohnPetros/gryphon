import { useSecureStorage } from '@/ui/hooks/use-secure-storage'
import { BiometricButtonView } from './biometric-button-view'
import { useBiometricButton } from './use-biometric-button'

export const BiometricButton = () => {
  const storageProvider = useSecureStorage()
  const { isBiometricEnable, handlePress } = useBiometricButton(storageProvider)

  return (
    <BiometricButtonView isBiometricEnabled={isBiometricEnable} onPress={handlePress} />
  )
}
