import { useState } from 'react'

import { Id } from '@/core/domain/structures'

type Params = {
  defaultAccountId?: string
  defaultStep?: number
  defaultEmail?: string
  signUpAccount: (accountId: string, email: string, password: string) => Promise<boolean>
  createAccount: (
    accountId: string,
    email: string,
    masterPassword: string,
  ) => Promise<void>
}

export function useSignUpScreen({
  defaultAccountId = '',
  defaultStep = 1,
  defaultEmail = '',
  signUpAccount,
  createAccount,
}: Params) {
  const [step, setStep] = useState(defaultStep)
  const [email, setEmail] = useState(defaultEmail)
  const [accountId, setAccountId] = useState<Id | null>(Id.create(defaultAccountId))

  async function handleSignUp(email: string, password: string) {
    let accountId = defaultAccountId ? Id.create(defaultAccountId) : null
    if (!accountId) {
      accountId = Id.create()
      setAccountId(accountId)
    }
    const isSuccessful = await signUpAccount(accountId.value, email, password)
    if (!isSuccessful) return
    setStep(2)
    setEmail(email)
  }

  function handleOtpConfirm() {
    setStep(3)
  }

  async function handleMasterPasswordCreate(masterPassword: string) {
    if (accountId) await createAccount(accountId.value, email, masterPassword)
  }

  return {
    step,
    handleSignUp,
    handleOtpConfirm,
    handleMasterPasswordCreate,
  }
}
