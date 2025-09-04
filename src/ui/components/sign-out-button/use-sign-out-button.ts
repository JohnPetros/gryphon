import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/hooks/use-navigation'

export function useSignOutButton(onSignOut: () => Promise<void>) {
  const navigation = useNavigation()

  async function handlePress() {
    await onSignOut()
    console.log('handlePress')
    navigation.navigate(ROUTES.auth.signIn)
  }

  return {
    handlePress,
  }
}
