import { useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import type { Vault } from '@/core/domain/entities'

type Params = {
  vaultsRepository: VaultsRepository
  accountId: Id
  onChange: (vaultId: string) => void
}

export const useVaultSelect = ({ vaultsRepository, accountId, onChange }: Params) => {
  const [vaults, setvaults] = useState<Vault[]>([])
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)

  useEffect(() => {
    async function loadVaults() {
      const vaults = await vaultsRepository.findAllByAccount(accountId)
      setvaults(vaults)
      setSelectedVault(vaults[0])
      onChange(vaults[0].id.value)
    }

    loadVaults()
  }, [vaultsRepository, accountId])

  return {
    vaults,
    selectedVault,
  }
}
