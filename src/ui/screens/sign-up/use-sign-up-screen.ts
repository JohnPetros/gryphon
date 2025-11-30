import { useEffect, useState } from 'react'

import { Id } from '@/core/domain/structures'
import type { StorageProvider } from '@/core/interfaces/providers'
import { STORAGE_KEYS } from '@/constants'

type Params = {
  defaultAccountId?: string
  defaultStep?: number
  defaultEmail?: string
  storageProvider: StorageProvider
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
  storageProvider,
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
    await storageProvider.setItem(STORAGE_KEYS.acountEmail, email)
  }

  function handleOtpConfirm() {
    setStep(3)
  }

  async function handleMasterPasswordCreate(masterPassword: string) {
    if (accountId) await createAccount(accountId.value, email, masterPassword)
  }

  // useEffect(() => {
  //   async function getAccountEmail() {
  //     const accountEmail = await storageProvider.getItem(STORAGE_KEYS.acountEmail)
  //     if (accountEmail) setEmail(accountEmail)
  //   }
  //   getAccountEmail()
  // }, [])

  return {
    step,
    handleSignUp,
    handleOtpConfirm,
    handleMasterPasswordCreate,
  }
}
