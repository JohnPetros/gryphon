import { ScrollView } from 'react-native'

import type { Credential } from '@/core/domain/entities'

import { Input } from '@/ui/components/input'
import { PasswordInput } from '@/ui/components/password-input'
import { PreviousScreenButton } from '@/ui/components/previous-screen-button'
import { ScreenContainer } from '@/ui/components/screen-container'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { CredentialMenu } from '@/ui/components/credential-menu'
import { CredentialIcon } from './credential-icon'
import { CredentialVault } from './credential-vault'
import { CredentialHistory } from './credential-history'
import { OutdatedCredentialBadge } from '@/ui/components/outdated-credential-badge'
import { Badge } from '@/ui/components/badge'

type Props = {
  credential: Credential
  credentialLogin: string
  credentialPassword: string
  isCredentialOutdated: boolean
  onCredentialDelete: () => void
  onCredentialRestore: () => void
}

export const CredentialView = ({
  credential,
  credentialLogin,
  credentialPassword,
  isCredentialOutdated,
  onCredentialDelete,
  onCredentialRestore,
}: Props) => {
  return (
    <ScreenContainer>
      <ScrollView>
        <Box className='flex-row justify-between'>
          <PreviousScreenButton />
          <CredentialMenu credential={credential} onDelete={onCredentialDelete} />
        </Box>

        <Box className='flex-row items-center gap-3 mt-6'>
          <CredentialIcon siteUrl={credential.siteUrl ?? ''} />
          <Box className='flex-1 gap-1'>
            <Text
              ellipsizeMode='tail'
              numberOfLines={1}
              className='text-2xl font-semibold'
            >
              {credential.title}
            </Text>
            <CredentialVault vaultId={credential.vaultId} />
          </Box>
        </Box>

        {isCredentialOutdated && (
          <Badge
            message='Credencial desatualizada'
            color='danger'
            icon='warning'
            className='mt-4 p-3'
          />
        )}

        <Box className='gap-3 mt-6'>
          <Box>
            <Input
              label='Login'
              icon='login'
              placeholder='Login'
              defaultValue={credentialLogin}
              isReadOnly
            />

            <PasswordInput
              label='Senha'
              hasStrength
              defaultValue={credentialPassword}
              isReadOnly
              isProtected
              onChange={() => {}}
            />
          </Box>

          <Input
            label='Site'
            icon='link'
            placeholder='Sem site vinculado'
            defaultValue={credential.siteUrl ?? ''}
            isReadOnly
          />
        </Box>

        <Box className='mt-6 pb-12'>
          <CredentialHistory credential={credential} onRestore={onCredentialRestore} />
        </Box>
      </ScrollView>
    </ScreenContainer>
  )
}
