import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useFonts } from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import * as TaskManager from 'expo-task-manager'
import * as BackgroundTask from 'expo-background-task'
import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'
export { ErrorBoundary } from 'expo-router'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'

import '../../global.css'
import { AuthContextProvider } from '@/ui/contexts/auth-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { UiProvider } from '@/ui/gluestack/ui-provider'
import { useNotification } from '@/ui/hooks/use-notification'

import { HibpService, NotificationService } from '@/rest/services'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { CLIENT_ENV } from '@/constants'
import { ExpoCryptoProvider } from '@/provision/crypto-provider/expo-crypto-provider'
import { ExpoSecureStorageProvider } from '@/provision/storage-provider/expo-secure-storage-provider'
import { VerifyPasswordLeakJob } from '@/ui/hooks/verify-password-leak-job'
import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
} from '@/database/watermelon'
import { ThemeContextProvider } from '@/ui/contexts/theme-context'

const VERIFY_PASSWORD_LEAK_JOB = 'VERIFY_PASSWORD_LEAK_JOB'

async function initializeBackgroundTask() {
  const isTaskRegistered = await TaskManager.isTaskRegisteredAsync(
    VERIFY_PASSWORD_LEAK_JOB,
  )
  if (isTaskRegistered) {
    await TaskManager.unregisterTaskAsync(VERIFY_PASSWORD_LEAK_JOB)
  }

  TaskManager.defineTask(VERIFY_PASSWORD_LEAK_JOB, async () => {
    try {
      const notificationRestClient = AxiosRestClient(`${CLIENT_ENV.gryphonBaseUrl}/api`)
      const hibpRestClient = AxiosRestClient(CLIENT_ENV.hibpUrl)

      const accountsRepository = WatermelonAccountsRepository(false)
      const credentialsRepository = WatermelonCredentialsRepository(false)
      const expoCryptoProvider = ExpoCryptoProvider()
      const storageProvider = ExpoSecureStorageProvider()
      const notificationService = NotificationService(notificationRestClient)
      const hibpService = HibpService(hibpRestClient)

      const job = VerifyPasswordLeakJob({
        accountsRepository,
        credentialsRepository,
        notificationService,
        cryptoProvider: expoCryptoProvider,
        hibpService,
        storageProvider,
      })

      await job.handle()
      return BackgroundTask.BackgroundTaskResult.Success
    } catch (error) {
      console.error(error)
      return BackgroundTask.BackgroundTaskResult.Failed
    }
  })

  await BackgroundTask.registerTaskAsync(VERIFY_PASSWORD_LEAK_JOB, {
    minimumInterval: 15, // minutes
  })
}

initializeBackgroundTask()
  .then(() => {
    console.log('Task manager resolved')
  })
  .catch((error) => {
    console.error(error)
  })

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

SplashScreen.preventAutoHideAsync()

export const RootLayout = () => {
  useNotification()
  const [loaded, error] = useFonts({
    JetBrainsMonoRegular: require('@/assets/fonts/JetBrainsMono-Regular.ttf'),
    JetBrainsMonoBold: require('@/assets/fonts/JetBrainsMono-Bold.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <ThemeContextProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <UiProvider>
            <ThemeProvider value={DarkTheme}>
              <ClerkProvider
                tokenCache={tokenCache}
                publishableKey={CLIENT_ENV.clerkPublishableKey}
                telemetry={false}
              >
                <AuthContextProvider>
                  <Slot />
                </AuthContextProvider>
              </ClerkProvider>
              <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </ThemeProvider>
          </UiProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeContextProvider>
  )
}

export default RootLayout
