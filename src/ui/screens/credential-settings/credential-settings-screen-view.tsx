import type { Credential } from '@/core/domain/entities'

import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { Box } from '@/ui/gluestack/box'
import { PreviousScreenButton } from '@/ui/components/previous-screen-button'
import { CredentialForm } from './credential-form'
import { KeyboardAvoidingView, ScrollView } from 'react-native'

type Props = {
  credential: Credential | null
  encryptionKey: string
  onCreate: (credential: Credential) => Promise<void>
  onUpdate: (credential: Credential) => Promise<void>
}

export const CredentialSettingsScreenView = ({
  credential,
  onCreate,
  onUpdate,
}: Props) => {
  return (
    <ScreenContainer>
      <PreviousScreenButton />

      <Box className='mt-6'>
        <ScreenTitle>
          {credential ? 'Editar Credencial' : 'Adicionar Credencial'}
        </ScreenTitle>

        <KeyboardAvoidingView>
          <ScrollView className='mt-6' contentContainerStyle={{ height: 1200 }}>
            <CredentialForm
              credential={credential}
              onCreate={onCreate}
              onUpdate={onUpdate}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </ScreenContainer>
  )
}
