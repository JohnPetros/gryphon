import type { Vault } from '@/core/domain/entities'
import type { VaultDto } from '@/core/domain/entities/dtos'

import { VaultFormView } from './vault-form-view'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type Props = {
  vault: Vault | null
  onCreate: (vault: VaultDto) => Promise<void>
  onUpdate: (vault: VaultDto) => Promise<void>
}

export const VaultForm = ({ vault, onCreate, onUpdate }: Props) => {
  const { account } = useAuthContext()
  if (account)
    return (
      <VaultFormView
        vault={vault}
        accountId={account.id}
        onCreate={onCreate}
        onUpdate={onUpdate}
      />
    )
}
