import { useLocalSearchParams } from 'expo-router'
import { VaultItensScreenView } from './vault-itens-screen-view'
import { useDatabase } from '@/ui/hooks/use-database'
import { useVaultItensScreen } from './use-vault-itens-screen'
import { Id } from '@/core/domain/structures'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type SearchParams = {
  vaultId: string
}

export const VaultItensScreen = () => {
  const { vaultId } = useLocalSearchParams<SearchParams>()
  const { account } = useAuthContext()
  const { vaultsRepository } = useDatabase()
  const {
    selectedVault,
    vaults,
    isDrawerOpen,
    handleDrawerClose,
    handleDrawerOpen,
    handleVaultSelect,
  } = useVaultItensScreen({
    vaultsRepository,
    vaultId: Id.create(vaultId),
    accountId: account?.id ?? Id.create(),
  })

  return (
    <VaultItensScreenView
      selectedVault={selectedVault}
      vaults={vaults}
      isDrawerOpen={isDrawerOpen}
      onVaultSelect={handleVaultSelect}
      onDrawerClose={handleDrawerClose}
      onDrawerOpen={handleDrawerOpen}
    />
  )
}
