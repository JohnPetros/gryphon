import type { vault } from '@/core/domain/entities'
import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { vaultForm } from './vault-form'

type Props = {
  vault: vault | null
  onCreate: (vault: vault) => Promise<void>
  onUpdate: (vault: vault) => Promise<void>
}

export const vaultScreenView = ({ vault, onCreate, onUpdate }: Props) => {
  return (
    <ScreenContainer>
      <ScreenTitle>Adicionar Cofre</ScreenTitle>

      <vaultForm vault={vault} onCreate={onCreate} onUpdate={onUpdate} />
    </ScreenContainer>
  )
}
