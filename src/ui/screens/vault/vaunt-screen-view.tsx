import type { Vault } from '@/core/domain/entities'
import type { VaultDto } from '@/core/domain/entities/dtos'

import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { Box } from '@/ui/gluestack/box'
import { PreviousScreenButton } from '@/ui/components/previous-screen-button'
import { VaultForm } from './vault-form'

type Props = {
  vault: Vault | null
  onCreate: (vault: VaultDto) => Promise<void>
  onUpdate: (vault: VaultDto) => Promise<void>
}

export const VaultScreenView = ({ vault, onCreate, onUpdate }: Props) => {
  return (
    <ScreenContainer>
      <PreviousScreenButton />

      <Box className='mt-6'>
        {vault ? (
          <ScreenTitle>Cofre</ScreenTitle>
        ) : (
          <ScreenTitle>Adicionar Cofre</ScreenTitle>
        )}
      </Box>

      <Box className='mt-10'>
        <VaultForm vault={vault} onCreate={onCreate} onUpdate={onUpdate} />
      </Box>
    </ScreenContainer>
  )
}
