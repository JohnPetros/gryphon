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

type Props = {
  credential: Credential
  credentialLogin: string
  credentialPassword: string
  onCredentialDelete: () => void
}

export const CredentialView = ({
  credential,
  credentialLogin,
  credentialPassword,
  onCredentialDelete,
}: Props) => {
  return (
    <ScreenContainer>
      <Box className='mt-6 flex-row justify-between'>
        <PreviousScreenButton />
        <CredentialMenu credential={credential} onDelete={onCredentialDelete} />
      </Box>

      <Box className='flex-row items-center gap-3 mt-6'>
        <CredentialIcon siteUrl={credential.siteUrl ?? ''} />
        <Box className='flex-1 gap-1'>
          <Text ellipsizeMode='tail' numberOfLines={1} className='text-2xl font-semibold'>
            {credential.title}
          </Text>
          <CredentialVault vaultId={credential.vaultId} />
        </Box>
      </Box>

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
    </ScreenContainer>
  )
}
