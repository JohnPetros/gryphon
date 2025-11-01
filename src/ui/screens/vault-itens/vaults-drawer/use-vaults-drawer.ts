import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { useIsFocused } from '@react-navigation/native'
import { useSegments } from 'expo-router'
import { useEffect, useState } from 'react'

export function useVaultsDrawer(vaultsRepository: VaultsRepository, accountId: Id) {
  const [vaults, setVaults] = useState<Vault[]>([])
  const isFocused = useIsFocused()
  const segments = useSegments()

  async function loadVaults() {
    const vaults = await vaultsRepository.findAllByAccount(accountId)
    setVaults(vaults)
  }

  useEffect(() => {
    loadVaults()
  }, [isFocused])

  useEffect(() => {
    console.log(segments, 'Mundança de tela')
  }, [segments])

  return {
    vaults,
    loadVaults,
  }
}
