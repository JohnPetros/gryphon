import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useVaultSelect } from './use-vaunt-select'
import { VaultSelectView } from './vault-select-view'

export const vaultSelect = () => {
  const { vaultsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vaults } = useVaultSelect(vaultsRepository, account?.id ?? Id.create())

  return <VaultSelectView vaults={vaults} />
}
