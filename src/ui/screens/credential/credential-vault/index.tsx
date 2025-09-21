import type { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useCredentialVault } from './use-credential-vault'
import { CredentialVaultView } from './credential-vault-view'

type Props = {
  vaultId: Id
}

export const CredentialVault = ({ vaultId }: Props) => {
  const { vaultsRepository } = useDatabase()
  const { vault } = useCredentialVault(vaultsRepository, vaultId)

  if (vault) return <CredentialVaultView vault={vault} />
}
