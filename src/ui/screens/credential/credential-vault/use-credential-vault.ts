import { useEffect, useState } from 'react'

import type { Vault } from '@/core/domain/entities'
import type { VaultsRepository } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'

export function useCredentialVault(vaultsRepository: VaultsRepository, vaultId: Id) {
  const [vault, setVault] = useState<Vault | null>(null)

  useEffect(() => {
    async function loadVault() {
      const vault = await vaultsRepository.findById(vaultId)
      console.log('vault', vault)
      setVault(vault)
    }
    if (vault) return
    loadVault()
  }, [vault, vaultId])

  return {
    vault,
  }
}
