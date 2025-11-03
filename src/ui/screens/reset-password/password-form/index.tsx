import { useAuth } from '@/ui/hooks/use-auth'
import { PasswordFormView } from './password-form-view'

type Props = {
  otp: string
  onPasswordReset: () => void
}

export const PasswordForm = ({ otp, onPasswordReset }: Props) => {
  const { resetAccountPassword } = useAuth()

  return (
    <PasswordFormView
      otp={otp}
      resetPassword={resetAccountPassword}
      onPasswordReset={onPasswordReset}
    />
  )
}
