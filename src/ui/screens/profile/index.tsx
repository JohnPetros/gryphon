import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { ProfileScreenView } from './profile-screen-view'

export const ProfileScreen = () => {
  const { account } = useAuthContext()
  return <ProfileScreenView accountEmail={account?.email ?? ''} />
}
