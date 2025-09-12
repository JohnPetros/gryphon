import { useState } from 'react'

import { Id } from '@/core/domain/structures'

type Params = {
  signUpAccount: (accountId: string, email: string, password: string) => Promise<void>
  createAccount: (
    accountId: string,
    email: string,
    masterPassword: string,
  ) => Promise<void>
}

export function useSignUpScreen({ signUpAccount, createAccount }: Params) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [accountId, setAccountId] = useState('')

  async function handleSignUp(email: string, password: string) {
    const accountId = Id.create()
    setAccountId(accountId.value)
    await signUpAccount(accountId.value, email, password)
    setStep(2)
    setEmail(email)
  }

  function handleOtpConfirm() {
    setStep(3)
  }

  async function handleMasterPasswordCreate(masterPassword: string) {
    await createAccount(accountId, email, masterPassword)
  }

  return {
    step,
    handleSignUp,
    handleOtpConfirm,
    handleMasterPasswordCreate,
  }
}
