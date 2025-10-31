import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='[noteId]' />
      <Stack.Screen name='settings/new' />
      <Stack.Screen name='settings/[noteId]' />
    </Stack>
  )
}
