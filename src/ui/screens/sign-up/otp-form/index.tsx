import { useAuth } from '@/ui/hooks/use-auth'
import { OtpFormView } from './otp-form-view'
import { useOtpForm } from './use-otp-form'
import { useThemeContext } from '@/ui/hooks/use-theme-context'

type Props = {
  onConfirm: () => void
}

export const OtpForm = ({ onConfirm }: Props) => {
  const { verifyOtpCode } = useAuth()
  const { theme } = useThemeContext()
  const { status, isFilled, handleFilled, handleCodeChange } = useOtpForm(
    verifyOtpCode,
    onConfirm,
  )

  return (
    <OtpFormView
      status={status}
      theme={theme}
      isFilled={isFilled}
      onChange={handleCodeChange}
      onFilled={handleFilled}
    />
  )
}
