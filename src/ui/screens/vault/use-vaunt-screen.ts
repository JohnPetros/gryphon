import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { useState } from 'react'

type Params = {
  accountId?: Id
  vaultId?: Id
  vaultsRepository: VaultsRepository
}

export function useVaultScreen({ vaultsRepository, accountId, vaultId }: Params) {
  const [vault, setVault] = useState<Vault | null>(null)

  async function handleVaultCreate(vault: Vault) {
    if (!accountId) return
    await vaultsRepository.add(vault, accountId)
  }

  async function handleVaultUpdate(vault: Vault) {
    await vaultsRepository.update(vault)
  }

  return {
    vault,
    handleVaultCreate,
    handleVaultUpdate,
  }
}
