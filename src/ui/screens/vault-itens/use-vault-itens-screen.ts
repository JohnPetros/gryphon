import { useEffect, useState } from 'react'

import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'

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

  useEffect(() => {
    async function loadVaults() {
      setIsLoading(false)

      const allVaults = await vaultsRepository.findAllByAccount(accountId)
      const vault = await vaultsRepository.findById(vaultId)

      setVaults(allVaults)
      if (!vault) {
        setSelectedVault(vaults[0])
        return
      }
    }
    if (!isLoading) return
    loadVaults()
  }, [vaultId, accountId, isLoading])

  return {
    selectedVault,
    vaults,
    isDrawerOpen,
    handleDrawerClose,
    handleDrawerOpen,
    handleVaultSelect,
  }
}
