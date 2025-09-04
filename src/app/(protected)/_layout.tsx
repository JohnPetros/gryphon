import { useAuth } from '@/ui/hooks/useAuth'
import { Redirect, Slot } from 'expo-router'

const Layout = () => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href='/auth/sign-in' />
  }

  return <Slot />
}

export default Layout
