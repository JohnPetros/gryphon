import { ScreenContainer } from '@/ui/components/screen-container'
import { EmailForm } from './email-form'
import { Text } from '@/ui/gluestack/text'
import { Box } from '@/ui/gluestack/box'
import { PasswordForm } from './password-form'

type Props = {
  otp: string
  onSendPasswordResetEmail: () => void
  onResetPassword: () => void
}

export const ResetPasswordScreenView = ({
  otp,
  onSendPasswordResetEmail,
  onResetPassword,
}: Props) => {
  return (
    <ScreenContainer>
      <Text className='mt-6 text-xl text-accent'>Redefinição de senha</Text>
      {!otp && (
        <Box className='mt-6'>
          <EmailForm onSendPasswordResetEmail={onSendPasswordResetEmail} />
        </Box>
      )}
      {otp && (
        <Box className='mt-6'>
          <PasswordForm otp={otp} onPasswordReset={onResetPassword} />
        </Box>
      )}
    </ScreenContainer>
  )
}
