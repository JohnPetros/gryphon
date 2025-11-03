import { useLocalSearchParams } from 'expo-router'

import { useToast } from '@/ui/hooks/use-toast'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { ResetPasswordScreenView } from './reset-password-screen-view'
import { useResetPasswordScreen } from './use-reset-password-screen'

type LocalSearchParams = {
  otp: string
}

export const ResetPasswordScreen = () => {
  const toastProvider = useToast()
  const navigationProvider = useNavigation()
  const { handleSendPasswordResetEmail, handleResetPassword } = useResetPasswordScreen({
    toastProvider,
    navigationProvider,
  })
  const searchParams = useLocalSearchParams<LocalSearchParams>()

  return (
    <ResetPasswordScreenView
      otp={searchParams.otp}
      onResetPassword={handleResetPassword}
      onSendPasswordResetEmail={handleSendPasswordResetEmail}
    />
  )
}
