import { useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import type { Vault } from '@/core/domain/entities'

export const useVaultSelect = (vaultsRepository: VaultsRepository, accountId: Id) => {
  const [vaults, setvaults] = useState<Vault[]>([])

  useEffect(() => {
    async function loadVaults() {
      const vaults = await vaultsRepository.findAllByAccount(accountId)
      setvaults(vaults)
    }

    loadVaults()
  }, [vaultsRepository, accountId])

  return {
    vaults,
  }
}
