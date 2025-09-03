import { useState } from 'react'

type Params = {
  signUpAccount: (email: string, password: string) => Promise<void>
  createAccount: (email: string, masterPassword: string) => Promise<void>
}

export function useSignUpScreen({ signUpAccount, createAccount }: Params) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')

  async function handleSignUp(email: string, password: string) {
    await signUpAccount(email, password)
    setStep(2)
    setEmail(email)
  }

  function handleOtpConfirm() {
    setStep(3)
  }

  async function handleMasterPasswordCreate(masterPassword: string) {
    await createAccount(email, masterPassword)
  }

  return {
    step,
    handleSignUp,
    handleOtpConfirm,
    handleMasterPasswordCreate,
  }
}
