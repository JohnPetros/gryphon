import type { Vaunt } from '@/core/domain/entities'
import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { VauntForm } from './vaunt-form'

type Props = {
  vaunt: Vaunt | null
  onCreate: (vaunt: Vaunt) => Promise<void>
  onUpdate: (vaunt: Vaunt) => Promise<void>
}

export const VauntScreenView = ({ vaunt, onCreate, onUpdate }: Props) => {
  return (
    <ScreenContainer>
      <ScreenTitle>Adicionar Cofre</ScreenTitle>

      <VauntForm vaunt={vaunt} onCreate={onCreate} onUpdate={onUpdate} />
    </ScreenContainer>
  )
}
