import { SignOutButtonView } from './sign-out-button-view'
import { useAuth } from '@/ui/hooks/useAuth'
import { useSignOutButton } from './use-sign-out-button'

export const SignOutButton = () => {
  const { signOutAccount } = useAuth()
  const { handlePress } = useSignOutButton(signOutAccount)

  return <SignOutButtonView onPress={handlePress} />
}
