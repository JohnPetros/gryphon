import { useMemo } from 'react'
// import { useNetworkState } from 'expo-network'

import type { InternetContextValue } from './internet-context-value'

export function useInternetContextProvider() {
  // const networkState = useNetworkState()

  const value: InternetContextValue = useMemo(() => {
    return {
      isOffline: true,
    }
  }, [])

  return value
}
