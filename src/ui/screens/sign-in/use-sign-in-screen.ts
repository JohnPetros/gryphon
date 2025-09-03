import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  signInAccount: (email: string, password: string) => Promise<boolean>
}

export function useSignInScreen({ signInAccount }: Params) {
  const navigation = useNavigation()

  async function handleSignIn(email: string, password: string) {
    const isSuccess = await signInAccount(email, password)
    if (isSuccess) {
      navigation.navigate(ROUTES.vault.itens())
      return
    }
    return
  }

  return {
    handleSignIn,
  }
}
