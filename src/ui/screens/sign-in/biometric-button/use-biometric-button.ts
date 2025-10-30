import { useState, useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import type { StorageProvider } from '@/core/interfaces/providers'
import { STORAGE_KEYS } from '@/constants'

export function useBiometricButton(storageProvider: StorageProvider) {
  const [isBiometricEnable, setIsBiometricEnable] = useState(false)

  async function handlePress() {
    const isAuthentication = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Desbloqueie sua conta',
      cancelLabel: 'Cancelar',
      fallbackLabel: 'Usar senha',
    })

    const accountId = await storageProvider.getItem(STORAGE_KEYS.accountId)

    if (isAuthentication.success && accountId) {
      setIsBiometricEnable(true)
    }
  }

  useEffect(() => {
    async function checkIsBiometricEnable() {
      const supported = await LocalAuthentication.hasHardwareAsync()
      setIsBiometricEnable(supported)
    }
    checkIsBiometricEnable()
  }, [])

  return {
    isBiometricEnable,
    handlePress,
  }
}
