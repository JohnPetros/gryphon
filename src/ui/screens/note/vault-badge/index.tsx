import type { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useVaultBadge } from './use-vault-badge'
import { VaultBadgeView } from './vault-badge-view'

type Props = {
  vaultId: Id
}

export const VaultBadge = ({ vaultId }: Props) => {
  const { vaultsRepository } = useDatabase()
  const { vault } = useVaultBadge(vaultsRepository, vaultId)

  if (vault) return <VaultBadgeView vault={vault} />
}
