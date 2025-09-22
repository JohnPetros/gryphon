import { Redirect, Slot } from 'expo-router'

import { AutoLockTimeoutBlockerView } from '@/ui/contexts/autolock-timeout-blocker'
import { useAuth } from '@/ui/hooks/use-auth'

const Layout = () => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href='/auth/sign-in' />
  }

  return (
    <AutoLockTimeoutBlockerView>
      <Slot />
    </AutoLockTimeoutBlockerView>
  )
}

export default Layout
