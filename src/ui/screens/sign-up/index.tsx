import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { SignUpScreenView } from './sign-up-screen-view'
import { useSignUpScreen } from './use-sign-up-screen'
import { useClerkAuthService } from '@/ui/hooks/useClerkAuthService'

export const SignUpScreen = () => {
  const { signUpAccount } = useClerkAuthService()
  const { createAccount } = useAuthContext()
  const { step, handleSignUp, handleOtpConfirm, handleMasterPasswordCreate } =
    useSignUpScreen({ signUpAccount, createAccount })

  return (
    <SignUpScreenView
      step={step}
      onSignUp={handleSignUp}
      onOtpConfirm={handleOtpConfirm}
      onMasterPasswordCreate={handleMasterPasswordCreate}
    />
  )
}
