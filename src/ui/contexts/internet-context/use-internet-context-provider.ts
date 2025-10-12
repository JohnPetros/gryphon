import { useEffect, useMemo } from 'react'
import { useNetInfo } from '@react-native-community/netinfo'

import type { InternetContextValue } from './internet-context-value'

export function useInternetContextProvider() {
  const networkState = useNetInfo()

  console.log({ networkState })

  const value: InternetContextValue = useMemo(() => {
    console.log({ networkState })
    return {
      isOffline:
        networkState.isInternetReachable !== undefined
          ? !networkState.isInternetReachable
          : false,
    }
  }, [networkState.isInternetReachable])

  useEffect(() => {
    // const unsubscribe = addNetworkStateListener((state) => {
    //   console.log({ state })
    // })
    // return () => {
    //   unsubscribe.remove()
    // }
  }, [])

  return value
}
