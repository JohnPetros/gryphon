import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='itens' options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout
