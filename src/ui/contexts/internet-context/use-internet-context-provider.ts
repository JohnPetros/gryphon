import { useEffect, useState } from 'react'
import { useNetInfo, addEventListener } from '@react-native-community/netinfo'

import type { InternetContextValue } from './internet-context-value'

export function useInternetContextProvider(
  onInternetConnected: () => Promise<void>,
): InternetContextValue {
  const networkState = useNetInfo()
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const isOffline = networkState.isInternetReachable === false
    if (!isOffline) onInternetConnected()
    setIsOffline(isOffline)

    const unsubscribe = addEventListener((state) => {
      setIsOffline(state.isInternetReachable === false)
    })

    return () => {
      unsubscribe()
    }
  }, [networkState.isInternetReachable])

  return {
    isOffline,
  }
}
