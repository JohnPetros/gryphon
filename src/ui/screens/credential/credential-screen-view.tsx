import type { Credential } from '@/core/domain/entities'

import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { CredentialForm } from './credential-form'
import { Box } from '@/ui/gluestack/box'

type Props = {
  credential: Credential | null
  encryptionKey: string
  onCreate: (credential: Credential) => Promise<void>
  onUpdate: (credential: Credential) => Promise<void>
}

export const CredentialScreenView = ({ credential, onCreate, onUpdate }: Props) => {
  return (
    <ScreenContainer>
      <ScreenTitle>Adicionar Credencial</ScreenTitle>

      <Box className='mt-6'>
        <CredentialForm credential={credential} onCreate={onCreate} onUpdate={onUpdate} />
      </Box>
    </ScreenContainer>
  )
}
