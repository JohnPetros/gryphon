import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { useEffect, useState } from 'react'

export function useVaultsDrawer(vaultsRepository: VaultsRepository, accountId: Id) {
  const [vaults, setVaults] = useState<Vault[]>([])

  async function loadVaults() {
    const vaults = await vaultsRepository.findAllByAccount(accountId)
    setVaults(vaults)
  }

  useEffect(() => {
    loadVaults()
  }, [])

  return {
    vaults,
    loadVaults,
  }
}
