import type { Vault } from '@/core/domain/entities'
import { VaultFormView } from './vault-form-view'

type Props = {
  vault: Vault | null
  onCreate: (vault: Vault) => Promise<void>
  onUpdate: (vault: Vault) => Promise<void>
}

export const VaultForm = ({ vault, onCreate, onUpdate }: Props) => {
  return <VaultFormView vault={vault} onCreate={onCreate} onUpdate={onUpdate} />
}
