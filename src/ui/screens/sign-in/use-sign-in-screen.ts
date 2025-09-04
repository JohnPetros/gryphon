import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { useToast } from '@/ui/hooks/use-toast'

type Params = {
  signInAccount: (email: string, password: string) => Promise<boolean>
}

export function useSignInScreen({ signInAccount }: Params) {
  const navigation = useNavigation()
  const toast = useToast()

  async function handleSignIn(email: string, password: string) {
    const isSuccess = await signInAccount(email, password)
    if (isSuccess) {
      navigation.navigate(ROUTES.vault.itens())
      return
    }
    toast.show('E-mail ou senha incorretos', 'error')
  }

  return {
    handleSignIn,
  }
}
