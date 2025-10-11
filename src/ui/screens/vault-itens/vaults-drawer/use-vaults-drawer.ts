import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

export function useVaultsDrawer(vaultsRepository: VaultsRepository, accountId: Id) {
  const [vaults, setVaults] = useState<Vault[]>([])
  const isFocused = useIsFocused()

  async function loadVaults() {
    const vaults = await vaultsRepository.findAllByAccount(accountId)
    setVaults(vaults)
  }

  useEffect(() => {
    loadVaults()
  }, [isFocused])

  return {
    vaults,
    loadVaults,
  }
}
