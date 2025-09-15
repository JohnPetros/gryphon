import { useEffect, useState } from 'react'

import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  accountId?: Id
  vaultId?: Id
  vaultsRepository: VaultsRepository
}

export function useVaultScreen({ vaultsRepository, accountId, vaultId }: Params) {
  const [vault, setVault] = useState<Vault | null>(null)
  const navigation = useNavigation()

  async function handleVaultCreate(vault: Vault) {
    if (!accountId) return
    await vaultsRepository.add(vault, accountId)
    navigation.navigate(ROUTES.vault.itens(vault.id.value))
  }

  async function handleVaultUpdate(vault: Vault) {
    await vaultsRepository.update(vault)
  }

  useEffect(() => {
    async function fetchVault() {
      if (!vaultId) return

      const vault = await vaultsRepository.findById(vaultId)
      if (!vault) throw new Error('Vault not found')
      setVault(vault)
    }

    fetchVault()
  }, [vaultId, vaultsRepository.findById])

  return {
    vault,
    handleVaultCreate,
    handleVaultUpdate,
  }
}
