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

import '../../global.css'
import { AuthContextProvider } from '@/ui/contexts/auth-context'

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
    <ThemeProvider value={DarkTheme}>
      <ClerkProvider tokenCache={tokenCache}>
        <AuthContextProvider>
          <Slot />
        </AuthContextProvider>
      </ClerkProvider>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ThemeProvider>
  )
}
