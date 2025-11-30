import { useCallback, useEffect, useState } from 'react'
import {
  isClerkAPIResponseError,
  useAuth as useClerkAuth,
  useSignIn,
  useSignUp,
  useUser,
} from '@clerk/clerk-expo'

import { useToast } from './use-toast'
import { Id } from '@/core/domain/structures'

const ERROR_MESSAGES: Record<string, string> = {
  'That email address is taken. Please try another.': 'E-mail já cadastrado',
}

export function useAuth() {
  const { isSignedIn, getToken, signOut } = useClerkAuth()
  const { signIn, setActive } = useSignIn()
  const { signUp } = useSignUp()
  const { user } = useUser()
  const [jwt, setJwt] = useState<string | null>(null)
  const toast = useToast()

  const signInAccount = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await signIn?.create({ identifier: email, password })
        if (response?.status === 'complete') {
          await setActive?.({ session: response.createdSessionId })
          return true
        }

        return false
      } catch (error) {
        console.warn(error)
        if (isClerkAPIResponseError(error)) {
          toast.show(error.message, 'error')
        }
        return false
      }
    },
    [signIn, setActive],
  )

  const signOutAccount = useCallback(async () => {
    await signOut()
  }, [signOut])

  const signUpAccount = useCallback(
    async (accountId: string, email: string, password: string) => {
      try {
        await signOutAccount()
        await signUp?.create({
          emailAddress: email,
          password,
          unsafeMetadata: { accountId },
        })
        await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })
        return true
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          toast.show(ERROR_MESSAGES[error.message], 'error')
        }
        return false
      }
    },
    [signUp, toast],
  )

  const sendAccountPasswordResetEmail = useCallback(
    async (email: string) => {
      try {
        await signIn?.create({
          strategy: 'reset_password_email_code',
          identifier: email,
        })
      } catch (error) {
        console.error(error)
      }
    },
    [signIn],
  )

  const resetAccountPassword = useCallback(
    async (otp: string, password: string) => {
      try {
        await signIn?.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: otp,
          password,
        })
        await signOut()
      } catch (error) {
        console.error(error)
      }
    },
    [signIn],
  )

  const verifyOtpCode = useCallback(
    async (code: string) => {
      const response = await signUp?.attemptEmailAddressVerification({ code })

      if (response?.status === 'complete') {
        return true
      }

      return false
    },
    [signUp],
  )

  useEffect(() => {
    async function getJwt() {
      const token = await getToken()
      setJwt(token)
    }

    getJwt()
  }, [getToken])

  return {
    accountId: user?.unsafeMetadata?.accountId
      ? Id.create(user.unsafeMetadata?.accountId as string)
      : null,
    isSignedIn: isSignedIn ?? false,
    accountEmail: user?.primaryEmailAddress?.emailAddress ?? '',
    jwt,
    signOutAccount,
    signUpAccount,
    signInAccount,
    verifyOtpCode,
    resetAccountPassword,
    sendAccountPasswordResetEmail,
  }
}
