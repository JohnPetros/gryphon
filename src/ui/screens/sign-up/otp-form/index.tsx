import { useAuth } from '@/ui/hooks/use-auth'
import { OtpFormView } from './otp-form-view'
import { useOtpForm } from './use-otp-form'

type Props = {
  onConfirm: () => void
}

export const OtpForm = ({ onConfirm }: Props) => {
  const { verifyOtpCode } = useAuth()
  const { status, isFilled, handleFilled, handleCodeChange } = useOtpForm(
    verifyOtpCode,
    onConfirm,
  )

  return (
    <OtpFormView
      status={status}
      isFilled={isFilled}
      onChange={handleCodeChange}
      onFilled={handleFilled}
    />
  )
}
