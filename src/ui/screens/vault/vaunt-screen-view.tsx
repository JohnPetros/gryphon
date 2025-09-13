import type { Vault } from '@/core/domain/entities'
import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { VaultForm } from './vault-form'
import { Box } from '@/ui/gluestack/box'
import { PreviousScreenButton } from '@/ui/components/previous-screen-button'

type Props = {
  vault: Vault | null
  onCreate: (vault: Vault) => Promise<void>
  onUpdate: (vault: Vault) => Promise<void>
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
