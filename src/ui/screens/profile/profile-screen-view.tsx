import { Link } from 'expo-router'
import { ScrollView } from 'react-native'

import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { SignOutButton } from '@/ui/components/sign-out-button'
import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Text } from '@/ui/gluestack/text'
import { MinimumPasswordStrenghSelect } from './minimum-password-strengh-select'
import { MasterPasswordRequirementSwitch } from './master-password-requirement-switch'
import { AutoLockTimeoutSelect } from './auto-lock-timeout-select'
import { CredentialRotationSelect } from './credential-rotation-select'
import { ThemeSelect } from './theme-select'
import { Icon } from '@/ui/components/icon'

type Props = {
  accountEmail: string
}

export const ProfileScreenView = ({ accountEmail }: Props) => {
  return (
    <ScreenContainer>
      <ScreenTitle>Perfil</ScreenTitle>

      <ScrollView>
        <Box className='mt-6'>
          <Text className='text-lg font-bold text-accent'>Conta</Text>
          <Box className='mt-4'>
            <Input label='E-mail' icon='email' defaultValue={accountEmail} isReadOnly />
          </Box>
        </Box>

        <Box className='mt-6'>
          <Text className='text-lg font-bold text-accent'>Segurança</Text>
          <Box className='mt-4'>
            <MinimumPasswordStrenghSelect />
            <AutoLockTimeoutSelect />
            <MasterPasswordRequirementSwitch />
            <CredentialRotationSelect />
          </Box>
        </Box>

        <Box className='mt-6'>
          <Text className='text-lg font-bold text-accent'>Aparência</Text>
          <Box className='mt-4'>
            <ThemeSelect />
          </Box>
        </Box>

        <Link href='/(protected)/backup' className='mt-12'>
          <Box className='flex flex-row items-center justify-center gap-3 px-6 border-accent h-16 w-full bg-surface'>
            <Icon name='backup' color='accent' size={22} />
            <Text className='text-accent text-xl'>Backup</Text>
          </Box>
        </Link>

        <Box className='mt-12 pb-24'>
          <SignOutButton />
        </Box>
      </ScrollView>
    </ScreenContainer>
  )
}
