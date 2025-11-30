import { useLocalSearchParams } from 'expo-router'

import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { SignUpScreenView } from './sign-up-screen-view'
import { useSignUpScreen } from './use-sign-up-screen'
import { useAuth } from '@/ui/hooks/use-auth'

type LocalSearchParams = {
  step: string
  accountId: string
  accountEmail: string
}

export const SignUpScreen = () => {
  const localSearchParams = useLocalSearchParams<LocalSearchParams>()
  const { signUpAccount } = useAuth()
  const { createAccount } = useAuthContext()
  const { step, handleSignUp, handleOtpConfirm, handleMasterPasswordCreate } =
    useSignUpScreen({
      defaultAccountId: localSearchParams.accountId,
      defaultEmail: localSearchParams.accountEmail,
      defaultStep: localSearchParams.step ? Number(localSearchParams.step) : 1,
      signUpAccount,
      createAccount,
    })

  return (
    <SignUpScreenView
      step={step}
      onSignUp={handleSignUp}
      onOtpConfirm={handleOtpConfirm}
      onMasterPasswordCreate={handleMasterPasswordCreate}
    />
  )
}
