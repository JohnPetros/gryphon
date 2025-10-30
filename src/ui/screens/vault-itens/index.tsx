import { useLocalSearchParams } from 'expo-router'

import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useVaultItensScreen } from './use-vault-itens-screen'
import { VaultItensScreenView } from './vault-itens-screen-view'

type SearchParams = {
  vaultId: string
  activeTab: 'credential' | 'note'
}

export const VaultItensScreen = () => {
  const { vaultId, activeTab } = useLocalSearchParams<SearchParams>()
  const { account } = useAuthContext()
  const { vaultsRepository } = useDatabase()
  const { synchronizeDatabase } = useDatabase()
  const {
    selectedVault,
    vaults,
    search,
    isDrawerOpen,
    handleDrawerClose,
    handleDrawerOpen,
    handleVaultSelect,
    handleVaultEdit,
    handleVaultDelete,
    handleSearchChange,
  } = useVaultItensScreen({
    vaultsRepository,
    defaultSelectedVaultId: Id.create(vaultId),
    accountId: account?.id ?? Id.create(),
    onDatabaseChange: synchronizeDatabase,
  })

  return (
    <VaultItensScreenView
      selectedVault={selectedVault}
      vaults={vaults}
      isDrawerOpen={isDrawerOpen}
      search={search}
      defaultActiveTab={activeTab}
      onSearchChange={handleSearchChange}
      onVaultSelect={handleVaultSelect}
      onDrawerClose={handleDrawerClose}
      onDrawerOpen={handleDrawerOpen}
      onVaultEdit={handleVaultEdit}
      onVaultDelete={handleVaultDelete}
    />
  )
}
