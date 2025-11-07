import { useEffect } from 'react'
import { Platform, Alert } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
    shouldUpdateBadge: false,
    shouldShowBanner: true,
  }),
})

type Params = {
  currentNotificationToken?: string | null
  onRegisterNotificationToken: (token: string) => Promise<void>
}

export function useNotificationContextProvider({
  currentNotificationToken,
  onRegisterNotificationToken,
}: Params) {
  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (currentNotificationToken) return

      let notificationToken: string | null = null

      if (!Device.isDevice) {
        Alert.alert('Erro', 'Notificações Push só funcionam em dispositivos físicos.')
        return
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Aviso',
          'Permissão de notificações não concedida. Não receberá atualizações.',
        )
        return
      }

      const projectId = Constants.expoConfig?.extra?.eas?.projectId

      if (!projectId) {
        Alert.alert(
          'Erro',
          "Falta o projectId no app.json. Corre 'eas project:init' ou define-o manualmente em 'extra.eas.projectId'.",
        )
        return
      }

      try {
        const expoPushtoken = await Notifications.getExpoPushTokenAsync({ projectId })
        notificationToken = expoPushtoken.data
        console.log('Expo Push Token:', notificationToken)
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Erro ao obter o token', error.message)
          return
        }
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }

      return notificationToken
    }

    registerForPushNotificationsAsync().then(async (notificationToken) => {
      if (notificationToken) {
        await onRegisterNotificationToken(notificationToken)
      }
    })
  }, [])
}
