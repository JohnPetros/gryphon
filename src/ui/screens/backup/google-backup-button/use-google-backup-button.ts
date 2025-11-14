import { useState } from 'react'
import { Alert } from 'react-native'
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin'

import type { StorageProvider } from '@/core/interfaces/providers'
import { STORAGE_KEYS } from '@/constants'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.file'],
  offlineAccess: true,
})

type Params = {
  storageProvider: StorageProvider
  onSignIn: (accountEmail: string) => void
}

export function useGoogleBackupButton({ storageProvider, onSignIn }: Params) {
  const [isSignedIn, setIsSignedIn] = useState(false)

  async function handleBackupButtonPress() {
    if (!isSignedIn) return

    const accessToken = await storageProvider.getItem(STORAGE_KEYS.googleAccessToken)
    if (!accessToken) return
  }

  async function handleSignInButtonPress() {
    const currentAuthCode = await storageProvider.getItem(STORAGE_KEYS.googleAccessToken)

    if (currentAuthCode) {
    }

    await GoogleSignin.hasPlayServices()
    const response = await GoogleSignin.signIn()

    if (!isSuccessResponse(response)) {
      Alert.alert('Erro', 'Não foi possível obter o código de autorização do Google.')
      return
    }

    const { accessToken } = await GoogleSignin.getTokens()

    if (!accessToken) {
      Alert.alert('Erro', 'Não foi possível obter o código de autorização do Google.')
      return
    }

    setIsSignedIn(true)
    onSignIn(response.data.user.email)
    await storageProvider.setItem(STORAGE_KEYS.googleAccessToken, accessToken)
  }

  return {
    isSignedIn,
    handleSignInButtonPress,
    handleBackupButtonPress,
  }
}
