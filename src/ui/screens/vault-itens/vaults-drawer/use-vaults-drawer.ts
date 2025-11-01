import { useState } from 'react'

import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'

export function useVaultsDrawer(vaultsRepository: VaultsRepository, accountId: Id) {
  const [vaults, setVaults] = useState<Vault[]>([])

  async function loadVaults() {
    const vaults = await vaultsRepository.findAllByAccount(accountId)
    setVaults(vaults)
  }

  return {
    vaults,
    loadVaults,
  }
}
