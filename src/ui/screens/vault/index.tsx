import { Id } from '@/core/domain/structures'

import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useDatabase } from '@/ui/hooks/use-database'
import { VaultScreenView } from './vaunt-screen-view'
import { useVaultScreen } from './use-vaunt-screen'

export const VaultScreen = () => {
  const { vaultsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vault, handleVaultCreate, handleVaultUpdate } = useVaultScreen({
    vaultsRepository,
    accountId: account?.id ?? Id.create(),
  })

  return (
    <VaultScreenView
      vault={vault}
      onCreate={handleVaultCreate}
      onUpdate={handleVaultUpdate}
    />
  )
}
