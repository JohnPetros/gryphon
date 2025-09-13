import { useEffect, useState } from 'react'
import { useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/clerk-expo'

export function useAuth() {
  const { userId, isSignedIn, getToken, signOut } = useClerkAuth()
  const { signIn, setActive } = useSignIn()
  const { signUp } = useSignUp()
  const [jwt, setJwt] = useState<string | null>(null)

  async function signInAccount(email: string, password: string) {
    try {
      const response = await signIn?.create({ identifier: email, password })
      if (response?.status === 'complete') {
        await setActive?.({ session: response.createdSessionId })
        return true
      }

      return false
    } catch (error) {
      console.warn(error)
      return false
    }
  }

  async function signUpAccount(accountId: string, email: string, password: string) {
    try {
      await signUp?.create({
        emailAddress: email,
        password,
        unsafeMetadata: { accountId },
      })
      await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })
    } catch (error) {
      console.error(error)
    }
  }

  async function signOutAccount() {
    await signOut()
  }

  async function verifyOtpCode(code: string) {
    const response = await signUp?.attemptEmailAddressVerification({ code })

    if (response?.status === 'complete') {
      return true
    }

    return false
  }

  useEffect(() => {
    async function getJwt() {
      const token = await getToken()
      setJwt(token)
    }

    getJwt()
  }, [isSignedIn, getToken])

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
