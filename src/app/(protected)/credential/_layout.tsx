import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='[credentialId]' options={{ headerShown: false }} />
      <Stack.Screen name='settings/new' options={{ headerShown: false }} />
      <Stack.Screen name='settings/[credentialId]' options={{ headerShown: false }} />
    </Stack>
  )
}
