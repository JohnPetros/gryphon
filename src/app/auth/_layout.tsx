import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

const Layout = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href='/vaunts/home/itens' />
  }

  return (
    <Stack initialRouteName='sign-in'>
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      <Stack.Screen name='sign-up' options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout
