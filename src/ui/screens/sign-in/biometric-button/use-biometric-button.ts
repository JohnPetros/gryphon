import { useState, useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'

import type { NavigationProvider, StorageProvider } from '@/core/interfaces/providers'

import { ROUTES, STORAGE_KEYS } from '@/constants'

type Params = {
  isSignedIn: boolean
  storageProvider: StorageProvider
  navigationProvider: NavigationProvider
}

export function useBiometricButton({
  isSignedIn,
  storageProvider,
  navigationProvider,
}: Params) {
  const [isBiometricEnable, setIsBiometricEnable] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)

  async function handlePress() {
    setIsFailure(false)
    const authentication = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Entrar com Biometria',
      cancelLabel: 'Cancelar',
      fallbackLabel: 'Usar senha',
    })

    if (authentication.success) {
      setIsSuccess(true)
      setTimeout(() => {
        navigationProvider.navigate(ROUTES.vaultItens)
      }, 1500)
    }
    if (!authentication.success) {
      setIsFailure(true)
    }
  }

  useEffect(() => {
    async function checkIsBiometricEnable() {
      if (!isSignedIn) return
      const [hasHardware, isEnrolled, hasAccountId, hasMasterPassword] =
        await Promise.all([
          LocalAuthentication.hasHardwareAsync(),
          LocalAuthentication.isEnrolledAsync(),
          storageProvider.hasItem(STORAGE_KEYS.accountId),
          storageProvider.hasItem(STORAGE_KEYS.masterPassword),
        ])
      setIsBiometricEnable(hasHardware && isEnrolled && hasAccountId && hasMasterPassword)
    }
    checkIsBiometricEnable()
  }, [isSignedIn])

  return {
    isBiometricEnable,
    isSuccess,
    isFailure,
    handlePress,
  }
}
