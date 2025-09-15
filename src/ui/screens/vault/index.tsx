import { useLocalSearchParams } from 'expo-router'

import { Id } from '@/core/domain/structures'

import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useDatabase } from '@/ui/hooks/use-database'
import { VaultScreenView } from './vaunt-screen-view'
import { useVaultScreen } from './use-vaunt-screen'

type SearchParams = {
  vaultId: string
}

export const VaultScreen = () => {
  const { vaultId } = useLocalSearchParams<SearchParams>()
  const { vaultsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vault, handleVaultCreate, handleVaultUpdate } = useVaultScreen({
    vaultId: vaultId ? Id.create(vaultId) : undefined,
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
