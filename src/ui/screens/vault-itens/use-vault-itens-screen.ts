import { useEffect, useState } from 'react'

import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'

import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  vaultsRepository: VaultsRepository
  vaultId: Id
  accountId: Id
}

export const useVaultItensScreen = ({ vaultsRepository, vaultId, accountId }: Params) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)
  const [vaults, setVaults] = useState<Vault[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  function handleDrawerClose() {
    setIsDrawerOpen(false)
  }

  function handleDrawerOpen() {
    setIsDrawerOpen(true)
  }

  function handleVaultSelect(vault: Vault) {
    setSelectedVault(vault)
    setIsDrawerOpen(false)
  }

  function handleVaultEdit(vaultId: Id) {
    navigation.navigate(ROUTES.vault(vaultId.value))
  }

  async function handleVaultDelete(vaultId: Id) {
    await vaultsRepository.remove(vaultId)
    const filteredVaults = vaults.filter((vault) => vault.id.value !== vaultId.value)
    setVaults(filteredVaults)
    setSelectedVault(filteredVaults[0])
  }

  useEffect(() => {
    async function loadVaults() {
      if (selectedVault) return
      const allVaults = await vaultsRepository.findAllByAccount(accountId)
      setVaults(allVaults)
      setSelectedVault(allVaults[0])
    }
    loadVaults()
  }, [vaultId, accountId, selectedVault])

  return {
    selectedVault,
    vaults,
    isDrawerOpen,
    handleDrawerClose,
    handleDrawerOpen,
    handleVaultSelect,
    handleVaultEdit,
    handleVaultDelete,
  }
}
