import type { NavigationProvider } from '@/core/interfaces/providers'

type Params = {
  isSignedIn: boolean
  navigationProvider: NavigationProvider
  signInAccount: (email: string, password: string) => Promise<void>
  onSignIn: () => Promise<void>
}

export function useSignInScreen({
  navigationProvider,
  isSignedIn,
  signInAccount,
  onSignIn,
}: Params) {
  async function handleSignIn(email: string, password: string) {
    if (isSignedIn) {
      navigationProvider.navigate('/vault-itens')
      return
    }
    await signInAccount(email, password)
    await onSignIn()
  }

  return {
    handleSignIn,
  }
}
