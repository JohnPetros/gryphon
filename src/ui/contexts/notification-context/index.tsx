import { createContext, type PropsWithChildren } from 'react'

import { useNotificationContextProvider } from './use-notification-context-provider'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

export const NotificationContextProvider = createContext({})

export const NotificationContextProviderProvider = ({ children }: PropsWithChildren) => {
  const { account, updateAccount } = useAuthContext()
  useNotificationContextProvider({
    currentNotificationToken: account?.notificationToken,
    onRegisterNotificationToken: async (notificationToken) => {
      if (!account) return
      account.notificationToken = notificationToken
      await updateAccount(account)
    },
  })

  return (
    <NotificationContextProvider.Provider value={{}}>
      {children}
    </NotificationContextProvider.Provider>
  )
}
