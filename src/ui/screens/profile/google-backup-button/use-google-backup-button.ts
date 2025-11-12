import { STORAGE_KEYS } from '@/constants'
import { StorageProvider } from '@/core/interfaces/providers'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Alert } from 'react-native'

const WEB_CLIENT_ID = 'SEU_WEB_CLIENT_ID_AQUI.apps.googleusercontent.com'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.file'],
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
})

type Params = {
  storageProvider: StorageProvider
}

export function useGoogleBackupButton({ storageProvider }: Params) {
  async function handlePress() {
    const currentAuthCode = await storageProvider.getItem(STORAGE_KEYS.googleAuthCode)

    if (currentAuthCode) {
    }

    await GoogleSignin.hasPlayServices()
    await GoogleSignin.signIn()

    const { data } = await GoogleSignin.signIn()

    if (!data?.serverAuthCode) {
      Alert.alert('Erro', 'Não foi possível obter o código de autorização do Google.')
      return
    }

    await storageProvider.setItem(STORAGE_KEYS.googleAuthCode, data.serverAuthCode)
  }

  return {
    handlePress,
  }
}
