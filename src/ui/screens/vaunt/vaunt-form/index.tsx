import type { Vaunt } from '@/core/domain/entities'
import { VauntFormView } from './vaunt-form-view'

type Props = {
  vaunt: Vaunt | null
  onCreate: (vaunt: Vaunt) => Promise<void>
  onUpdate: (vaunt: Vaunt) => Promise<void>
}

export const VauntForm = ({ vaunt, onCreate, onUpdate }: Props) => {
  return <VauntFormView vaunt={vaunt} onCreate={onCreate} onUpdate={onUpdate} />
}
