import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useVaultSelect } from './use-vaunt-select'
import { VaultSelectView } from './vault-select-view'

type Props = {
  onChange: (vaultId: string) => void
}

export const VaultSelect = ({ onChange }: Props) => {
  const { vaultsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vaults, selectedVault } = useVaultSelect({
    vaultsRepository,
    accountId: account?.id ?? Id.create(),
    onChange,
  })

  return (
    <VaultSelectView vaults={vaults} selectedVault={selectedVault} onChange={onChange} />
  )
}
