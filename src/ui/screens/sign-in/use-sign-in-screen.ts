type Params = {
  signInAccount: (email: string, password: string) => Promise<void>
  onSignIn: () => Promise<void>
}

export function useSignInScreen({ signInAccount, onSignIn }: Params) {
  async function handleSignIn(email: string, password: string) {
    await signInAccount(email, password)
    await onSignIn()
  }

  return {
    handleSignIn,
  }
}
