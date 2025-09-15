import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { SignOutButton } from '@/ui/components/sign-out-button'
import { Box } from '@/ui/gluestack/box'
import { MinimumPasswordStrenghSelect } from './minimum-password-strengh'
import { Text } from '@/ui/gluestack/text'

export const ProfileScreenView = () => {
  return (
    <ScreenContainer>
      <ScreenTitle>Perfil</ScreenTitle>

      <Box className='mt-12'>
        <Text className='text-lg font-bold text-accent'>Segurança</Text>
        <Box className='mt-4'>
          <MinimumPasswordStrenghSelect />
        </Box>
      </Box>

      <Box className='mt-12'>
        <SignOutButton />
      </Box>
    </ScreenContainer>
  )
}
