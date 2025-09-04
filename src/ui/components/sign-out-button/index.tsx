import { SignOutButtonView } from './sign-out-button-view'
import { useClerkAuthService } from '@/ui/hooks/useClerkAuthService'
import { useSignOutButton } from './use-sign-out-button'

export const SignOutButton = () => {
  const { signOutAccount } = useClerkAuthService()
  const { handlePress } = useSignOutButton(signOutAccount)

  return <SignOutButtonView onPress={handlePress} />
}
