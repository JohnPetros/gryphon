import { useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import type { Vault } from '@/core/domain/entities'
import { Alert } from 'react-native'

type Params = {
  vaultsRepository: VaultsRepository
  accountId: Id
  onChange: (vaultId: string) => void
}

export const useVaultSelect = ({ vaultsRepository, accountId, onChange }: Params) => {
  const [vaults, setVaults] = useState<Vault[]>([])
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)

  useEffect(() => {
    async function loadVaults() {
      const vaults = await vaultsRepository.findAllByAccount(accountId)
      if (vaults.length === 0) {
        Alert.alert('Nenhum cofre cadastrado, cadastre um cofre primeiro')
        return
      }
      setVaults(vaults)
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
