import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin'
import * as FileSystem from 'expo-file-system'
import { fetch } from 'expo/fetch'

import type {
  DatabaseProvider,
  DatetimeProvider,
  StorageProvider,
} from '@/core/interfaces/providers'
import { STORAGE_KEYS } from '@/constants'
import { DatabaseService } from '@/core/interfaces/services'
import { Id } from '@/core/domain/structures'

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.appfolder',
    'https://www.googleapis.com/auth/drive.install',
  ],
})

type Params = {
  accountId: Id | null
  storageProvider: StorageProvider
  datetimeProvider: DatetimeProvider
  databaseService: DatabaseService
}

export function useGoogleBackup({ storageProvider }: Params) {
  const [accessToken, setAccessToken] = useState('')
  const [googleAccountEmail, setGoogleAccountEmail] = useState('')
  const [isLoadingAccessToken, setIsLoadingAccessToken] = useState(true)

  async function handleSignOutButtonPress() {
    await GoogleSignin.signOut()
    setAccessToken('')
    setGoogleAccountEmail('')
    await storageProvider.deleteItem(STORAGE_KEYS.googleAccessToken)
  }

  async function handleSignInButtonPress() {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices()
      if (!hasPlayServices) {
        Alert.alert('Erro', 'O Google Play Services não está instalado.')
      }
      await GoogleSignin.signOut()
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

      setAccessToken(accessToken)
      setGoogleAccountEmail(response.data.user.email)
      await storageProvider.setItem(STORAGE_KEYS.googleAccessToken, accessToken)
    } catch (error) {
      console.warn('Error on google sign in', error)
    }
  }

  useEffect(() => {
    async function loadAccessToken() {
      setIsLoadingAccessToken(true)
      const accessToken = await storageProvider.getItem(STORAGE_KEYS.googleAccessToken)
      if (accessToken) setAccessToken(accessToken)
      const response = await GoogleSignin.signInSilently()
      if (response.data) setGoogleAccountEmail(response.data.user.email)
      setTimeout(() => {
        setIsLoadingAccessToken(false)
      }, 500)
    }
    loadAccessToken()
  }, [])

  return {
    accessToken,
    googleAccountEmail,
    isLoadingAccessToken,
    handleSignInButtonPress,
    handleSignOutButtonPress,
  }
}
