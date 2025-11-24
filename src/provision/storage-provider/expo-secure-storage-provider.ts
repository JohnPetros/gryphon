import type { StorageProvider } from '@/core/interfaces/providers'
import * as ExpoSecureStore from 'expo-secure-store'

export const ExpoSecureStorageProvider = (): StorageProvider => {
  return {
    async getItem(key: string) {
      return ExpoSecureStore.getItem(key)
    },

    async setItem(key: string, value: string) {
      return ExpoSecureStore.setItemAsync(key, value)
    },

    async deleteItem(key: string) {
      return ExpoSecureStore.deleteItemAsync(key)
    },

    hasItem(key: string) {
      return ExpoSecureStore.getItem(key) !== null
    },
  }
}
