import { useMemo } from 'react'
import { useNetworkState } from 'expo-network'

import type { InternetContextValue } from './internet-context-value'

export function useInternetContextProvider() {
  const networkState = useNetworkState()

  const value: InternetContextValue = useMemo(() => {
    return {
      isOnline: networkState.isConnected ?? false,
    }
  }, [networkState.isConnected])

  return value
}
