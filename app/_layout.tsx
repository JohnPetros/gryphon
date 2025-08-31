import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import '@/global.css'
import { GluestackUIProvider } from '../ui/gluestack/gluestack-ui-provider'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Box } from '@/ui/gluestack/box'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
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
    <GluestackUIProvider mode='dark'>
      <ThemeProvider value={DarkTheme}>
        <Box className='flex-1 h-[100vh] bg-dark-grey'>
          <Slot />
        </Box>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ThemeProvider>
    </GluestackUIProvider>
  )
}
