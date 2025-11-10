import { createContext, type PropsWithChildren } from 'react'

import { useNotificationContextProvider } from './use-notification-context-provider'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

export const NotificationContext = createContext({})

export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
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
    <NotificationContext.Provider value={{}}>{children}</NotificationContext.Provider>
  )
}
