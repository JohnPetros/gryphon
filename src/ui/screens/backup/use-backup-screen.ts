import { useState } from 'react'

export function useBackupScreen() {
  const [accountEmail, setAccountEmail] = useState('')

  async function handleSignIn(email: string) {
    setAccountEmail(email)
  }

  return {
    accountEmail,
    handleSignIn,
  }
}
