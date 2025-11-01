import { Slot } from 'expo-router'

import { AutoLockTimeoutBlockerView } from '@/ui/contexts/autolock-timeout-blocker'
import { InternetContextProvider } from '@/ui/contexts/internet-context'

const Layout = () => {
  return (
    <AutoLockTimeoutBlockerView>
      <InternetContextProvider>
        <Slot />
      </InternetContextProvider>
    </AutoLockTimeoutBlockerView>
  )
}

export default Layout
