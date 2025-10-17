import { useCallback, useEffect, useState } from 'react'
import {
  isClerkAPIResponseError,
  useAuth as useClerkAuth,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo'

import { useToast } from './use-toast'

export function useAuth() {
  const { userId, isSignedIn, getToken, signOut } = useClerkAuth()
  const { signIn, setActive } = useSignIn()
  const { signUp } = useSignUp()
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

  const signUpAccount = useCallback(
    async (accountId: string, email: string, password: string) => {
      try {
        await signUp?.create({
          emailAddress: email,
          password,
          unsafeMetadata: { accountId },
        })
        await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })
        return true
      } catch (error) {
        console.warn(error)
        return false
      }
    },
    [signUp, toast],
  )

  const signOutAccount = useCallback(async () => {
    await signOut()
  }, [signOut])

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
    accountId: userId,
    isSignedIn,
    jwt,
    signOutAccount,
    signUpAccount,
    signInAccount,
    verifyOtpCode,
  }
}
