import { useCallback } from 'react'
import * as ExpoSecureStore from 'expo-secure-store'

export function useSecureStore() {
  const getItem = useCallback(async (key: string) => {
    return await ExpoSecureStore.getItemAsync(key)
  }, [])

  const setItem = useCallback(async (key: string, value: string) => {
    await ExpoSecureStore.setItemAsync(key, value)
  }, [])

  return {
    getItem,
    setItem,
  }
}
