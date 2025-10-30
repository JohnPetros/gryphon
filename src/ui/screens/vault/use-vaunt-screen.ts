import { useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { Vault } from '@/core/domain/entities'
import type { NavigationProvider } from '@/core/interfaces/providers/navigation-provider'
import type { VaultDto } from '@/core/domain/entities/dtos'
import { ROUTES } from '@/constants'

import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  accountId?: Id
  vaultId?: Id
  vaultsRepository: VaultsRepository
  navigation: NavigationProvider
  onDatabaseChange: () => Promise<void>
}

export function useVaultScreen({
  vaultsRepository,
  accountId,
  vaultId,
  onDatabaseChange,
}: Params) {
  const [vault, setVault] = useState<Vault | null>(null)
  const navigation = useNavigation()

  async function handleVaultCreate(vaultDto: VaultDto) {
    if (!accountId) return
    const vault = Vault.create(vaultDto)
    await vaultsRepository.add(vault)
    try {
      await onDatabaseChange()
    } catch {}
    setVault(vault)
    navigation.navigate(ROUTES.vaultItens, { vaultId: vault.id.value })
  }

  async function handleVaultUpdate(vaultDto: VaultDto) {
    if (!vaultId) return
    const vault = Vault.create({
      ...vaultDto,
      id: vaultId.value,
    })
    await vaultsRepository.update(vault)
    try {
      await onDatabaseChange()
    } catch {}
    navigation.navigate(ROUTES.vaultItens, { vaultId: vaultId.value })
  }

  useEffect(() => {
    async function loadVault() {
      if (vault || !vaultId) return
      const loadedVault = await vaultsRepository.findById(vaultId)
      setVault(loadedVault)
    }
    loadVault()
  }, [vaultId, vaultsRepository.findById])

  return {
    vault,
    handleVaultCreate,
    handleVaultUpdate,
  }
}
