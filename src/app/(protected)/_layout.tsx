import { Slot } from 'expo-router'

import { AutoLockTimeoutBlockerView } from '@/ui/contexts/autolock-timeout-blocker'
import { InternetContextProvider } from '@/ui/contexts/internet-context'
import { NotificationContextProvider } from '@/ui/contexts/notification-context'

const Layout = () => {
  return (
    <NotificationContextProvider>
      <AutoLockTimeoutBlockerView>
        <InternetContextProvider>
          <Slot />
        </InternetContextProvider>
      </AutoLockTimeoutBlockerView>
    </NotificationContextProvider>
  )
}

export default Layout
