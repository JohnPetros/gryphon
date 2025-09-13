import { useEffect, useState } from 'react'

import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
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
    console.log('accountId', { accountId })
    try {
      if (!accountId) return
      await vaultsRepository.add(vault, accountId)
      setVault(vault)
      const allVaults = await vaultsRepository.findAllByAccount(accountId)
      console.log({ allVaults })
    } catch (error) {
      console.error('Error creating vault', error)
    }
    // navigation.navigate(ROUTES.newItem)
  }

  async function handleVaultUpdate(vault: Vault) {
    await vaultsRepository.update(vault)
  }

  useEffect(() => {
    async function loadVault() {
      if (!vaultId) return
      const vault = await vaultsRepository.findById(vaultId)
      setVault(vault)
    }
    loadVault()
  }, [vaultId, vaultsRepository.findById])

  return {
    vault,
    handleVaultCreate,
    handleVaultUpdate,
  }
}
