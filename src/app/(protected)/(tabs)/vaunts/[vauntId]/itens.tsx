import { SignOutButton } from '@/ui/components/sign-out-button'
import { Text } from '@/ui/gluestack/text'
import { ScreenContainer } from '@/ui/components/screen-container'

const Screen = () => {
  return (
    <ScreenContainer>
      <Text>vault Itens</Text>
      <SignOutButton />
    </ScreenContainer>
  )
}

export default Screen
