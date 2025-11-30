import { useEffect } from 'react'
import { OneSignal, LogLevel } from 'react-native-onesignal'

import type { Account } from '@/core/domain/entities'

import { CLIENT_ENV } from '@/constants'

export function useNotification() {
  function login(account: Account) {
    console.log(account.id.value)
    OneSignal.login(account.id.value)
  }

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose)
    OneSignal.initialize(CLIENT_ENV.oneSignalAppId)
    OneSignal.Notifications.requestPermission(true)
  }, [])

  return {
    login,
  }
}
