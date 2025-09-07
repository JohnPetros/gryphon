import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { SignUpScreenView } from './sign-up-screen-view'
import { useSignUpScreen } from './use-sign-up-screen'
import { useAuth } from '@/ui/hooks/use-auth'

export const SignUpScreen = () => {
  const { signUpAccount } = useAuth()
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
