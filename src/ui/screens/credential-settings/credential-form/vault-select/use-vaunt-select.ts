import { useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import type { Vault } from '@/core/domain/entities'
import { Alert } from 'react-native'

type Params = {
  vaultsRepository: VaultsRepository
  accountId: Id
  defaultValue: string
  onChange: (vaultId: string) => void
}

export const useVaultSelect = ({
  vaultsRepository,
  accountId,
  defaultValue,
  onChange,
}: Params) => {
  const [vaults, setVaults] = useState<Vault[]>([])
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)

  console.log({ selectedVault })

  function handleChange(vaultId: string) {
    setSelectedVault(vaults.find((vault) => vault.id.value === vaultId) ?? null)
    onChange(vaultId)
  }

  useEffect(() => {
    async function loadVaults() {
      const vaults = await vaultsRepository.findAllByAccount(accountId)
      if (vaults.length === 0) {
        Alert.alert('Nenhum cofre cadastrado, cadastre um cofre primeiro')
        return
      }
      setVaults(vaults)

      if (defaultValue) {
        console.log('defaultValue', defaultValue)
        console.log(
          'defaultValue',
          vaults.find((vault) => vault.id.value === defaultValue),
        )
        setSelectedVault(vaults.find((vault) => vault.id.value === defaultValue) ?? null)
        onChange(defaultValue)
        return
      }

      setSelectedVault(vaults[0])
      onChange(vaults[0].id.value)
    }

    loadVaults()
  }, [vaultsRepository, accountId])

  return {
    vaults,
    selectedVault,
    handleChange,
  }
}
