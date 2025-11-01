import { useCallback } from 'react'
import * as ExpoSecureStore from 'expo-secure-store'
import type { StorageProvider } from '@/core/interfaces/providers/storage-provider'

export function useSecureStorage(): StorageProvider {
  const getItem = useCallback(async (key: string) => {
    return await ExpoSecureStore.getItemAsync(key)
  }, [])

  const setItem = useCallback(async (key: string, value: string) => {
    await ExpoSecureStore.setItemAsync(key, value)
  }, [])

  const deleteItem = useCallback(async (key: string) => {
    await ExpoSecureStore.deleteItemAsync(key)
  }, [])

  const hasItem = useCallback(
    async (key: string) => {
      const item = await getItem(key)
      return item !== null
    },
    [getItem],
  )

  return {
    getItem,
    setItem,
    deleteItem,
    hasItem,
  }
}
