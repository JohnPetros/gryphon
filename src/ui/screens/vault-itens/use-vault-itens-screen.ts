import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'

import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  vaultsRepository: VaultsRepository
  defaultSelectedVaultId: Id
  accountId: Id
  onDatabaseChange: () => Promise<void>
}

export const useVaultItensScreen = ({
  vaultsRepository,
  defaultSelectedVaultId,
  accountId,
  onDatabaseChange,
}: Params) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)
  const [vaults, setVaults] = useState<Vault[]>([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const navigation = useNavigation()

  const loadVaults = useCallback(async () => {
    const allVaults = await vaultsRepository.findAllByAccount(accountId)
    setVaults(allVaults)
    const defaultSelectedVault = allVaults.find(
      (vault) => vault.id.value === defaultSelectedVaultId.value,
    )
    setSelectedVault(defaultSelectedVault ?? allVaults[0])
  }, [defaultSelectedVaultId, accountId])

  function handleDrawerClose() {
    setIsDrawerOpen(false)
  }

  async function handleDrawerOpen() {
    const allVaults = await vaultsRepository.findAllByAccount(accountId)
    setVaults(allVaults)
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
    try {
      await onDatabaseChange()
    } catch {}
    const filteredVaults = vaults.filter((vault) => vault.id.value !== vaultId.value)
    setVaults(filteredVaults)
    setSelectedVault(filteredVaults[0])
  }

  function handleSearchChange(search: string) {
    setSearch(search)
  }

  useEffect(() => {
    loadVaults()
  }, [])

  return {
    selectedVault,
    vaults,
    isDrawerOpen,
    search: debouncedSearch,
    handleDrawerClose,
    handleDrawerOpen,
    handleVaultSelect,
    handleVaultEdit,
    handleVaultDelete,
    handleSearchChange,
  }
}
