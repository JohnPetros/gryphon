import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useFonts } from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'
export { ErrorBoundary } from 'expo-router'

import '../../global.css'
import { GluestackUIProvider } from '../ui/gluestack/gluestack-ui-provider'
import { Box } from '../ui/gluestack/box'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    JetBrainsMono: require('../../assets/fonts/JetBrainsMono.ttf'),
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
