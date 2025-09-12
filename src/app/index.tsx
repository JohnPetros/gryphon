import { Text } from '@/ui/gluestack/text'
import { Redirect } from 'expo-router'

const Index = () => {
  console.log('Index')
  return <Redirect href='/auth/sign-in' />
}

export default Index
