import { Redirect, Slot } from 'expo-router'

import { AutoLockTimeoutBlockerView } from '@/ui/contexts/autolock-timeout-blocker'
import { useAuth } from '@/ui/hooks/use-auth'
import { InternetContextProvider } from '@/ui/contexts/internet-context'

const Layout = () => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href='/auth/sign-in' />
  }

  return (
    <AutoLockTimeoutBlockerView>
      <InternetContextProvider>
        <Slot />
      </InternetContextProvider>
    </AutoLockTimeoutBlockerView>
  )
}

export default Layout
