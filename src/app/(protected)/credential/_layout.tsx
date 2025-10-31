import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='[credentialId]' />
      <Stack.Screen name='settings/new' />
      <Stack.Screen name='settings/[credentialId]' />
    </Stack>
  )
}
