import { useEffect, useState } from 'react'

import { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { Vault } from '@/core/domain/entities'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { ROUTES } from '@/constants'
import type { VaultDto } from '@/core/domain/entities/dtos'

type Params = {
  accountId?: Id
  vaultId?: Id
  vaultsRepository: VaultsRepository
}

export function useVaultScreen({ vaultsRepository, accountId, vaultId }: Params) {
  const [vault, setVault] = useState<Vault | null>(null)
  const navigation = useNavigation()

  async function handleVaultCreate(vaultDto: VaultDto) {
    if (!accountId) return
    try {
      const vault = Vault.create(vaultDto)
      await vaultsRepository.add(vault, accountId)
      setVault(vault)
      navigation.navigate(ROUTES.vaultItens)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleVaultUpdate(vaultDto: VaultDto) {
    try {
      if (!vaultId) return
      const vault = Vault.create({
        ...vaultDto,
        id: vaultId.value,
      })
      await vaultsRepository.update(vault)
      navigation.navigate(ROUTES.vaultItens)
    } catch (error) {
      console.error(error)
    }
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
