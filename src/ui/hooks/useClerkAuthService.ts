import { useAuth, useSignUp } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'

export function useClerkAuthService() {
  const { isSignedIn, getToken } = useAuth()
  const { signUp } = useSignUp()
  const [jwt, setJwt] = useState<string | null>(null)

  async function signUpAccount(email: string, password: string) {
    try {
      await signUp?.create({ emailAddress: email, password })
      await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })
    } catch (error) {
      console.error(error)
    }
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
    jwt,
    signUpAccount,
    verifyOtpCode,
  }
}
