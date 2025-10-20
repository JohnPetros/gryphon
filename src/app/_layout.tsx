import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useFonts } from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'
export { ErrorBoundary } from 'expo-router'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated'

import '../../global.css'
import { AuthContextProvider } from '@/ui/contexts/auth-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { UiProvider } from '@/ui/gluestack/ui-provider'

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <UiProvider>
          <ThemeProvider value={DarkTheme}>
            <ClerkProvider tokenCache={tokenCache} telemetry={false}>
              <AuthContextProvider>
                <Slot />
              </AuthContextProvider>
            </ClerkProvider>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
          </ThemeProvider>
        </UiProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
