import { AppIcon } from '@/ui/components/app-icon'
import { AppName } from '@/ui/components/app-name'
import { ScreenContainer } from '@/ui/components/screen-container'
import { Box } from '@/ui/gluestack/box'
import { OtpForm } from './otp-form'
import { SignUpForm } from './sign-up-form'
import { MasterPasswordForm } from './master-password-form'

type Props = {
  step: number
  onSignUp: (email: string, password: string) => Promise<void>
  onOtpConfirm: () => void
  onMasterPasswordCreate: (password: string) => Promise<void>
}

export const SignUpScreenView = ({
  step,
  onSignUp,
  onOtpConfirm,
  onMasterPasswordCreate,
}: Props) => {
  return (
    <ScreenContainer>
      <Box className='flex flex-row items-center justify-center gap-3'>
        <AppIcon size='md' />
        <AppName size='4xl' />
      </Box>

      <Box className='mt-12'>
        {step === 1 && <SignUpForm onSignUp={onSignUp} />}
        {step === 2 && <OtpForm onConfirm={onOtpConfirm} />}
        {step === 3 && <MasterPasswordForm onCreate={onMasterPasswordCreate} />}
      </Box>
    </ScreenContainer>
  )
}
