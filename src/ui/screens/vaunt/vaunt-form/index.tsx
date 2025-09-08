import type { vault } from '@/core/domain/entities'
import { vaultFormView } from './vault-form-view'

type Props = {
  vault: vault | null
  onCreate: (vault: vault) => Promise<void>
  onUpdate: (vault: vault) => Promise<void>
}

export const vaultForm = ({ vault, onCreate, onUpdate }: Props) => {
  return <vaultFormView vault={vault} onCreate={onCreate} onUpdate={onUpdate} />
}
