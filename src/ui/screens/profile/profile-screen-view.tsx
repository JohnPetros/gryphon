import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { SignOutButton } from '@/ui/components/sign-out-button'

export const ProfileScreenView = () => {
  return (
    <ScreenContainer>
      <ScreenTitle>Perfil</ScreenTitle>

      <SignOutButton />
    </ScreenContainer>
  )
}
