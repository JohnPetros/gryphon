import { useAuth } from '@/ui/hooks/use-auth'
import { Redirect, Slot } from 'expo-router'

const Layout = () => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href='/auth/sign-in' />
  }

  return <Slot />
}

export default Layout
