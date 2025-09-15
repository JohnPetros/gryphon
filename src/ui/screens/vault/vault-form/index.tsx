import type { Vault } from '@/core/domain/entities'
import type { VaultDto } from '@/core/domain/entities/dtos'

import { VaultFormView } from './vault-form-view'

type Props = {
  vault: Vault | null
  onCreate: (vault: VaultDto) => Promise<void>
  onUpdate: (vault: VaultDto) => Promise<void>
}

export const VaultForm = ({ vault, onCreate, onUpdate }: Props) => {
  return <VaultFormView vault={vault} onCreate={onCreate} onUpdate={onUpdate} />
}
