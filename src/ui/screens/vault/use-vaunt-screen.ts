import { useEffect, useState } from 'react'

import type { Vault } from '@/core/domain/entities'
import { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { ROUTES } from '@/constants'
import { Alert } from 'react-native'

type Params = {
  accountId?: Id
  vaultId?: Id
  vaultsRepository: VaultsRepository
}

export function useVaultScreen({ vaultsRepository, accountId, vaultId }: Params) {
  const [vault, setVault] = useState<Vault | null>(null)
  const navigation = useNavigation()

  async function handleVaultCreate(vault: Vault) {
    if (!accountId) return
    await vaultsRepository.add(vault, accountId)
    setVault(vault)
    navigation.navigate(ROUTES.vaultItens)
  }

  async function handleVaultUpdate(vault: Vault) {
    try {
      Alert.alert('Atualizar', 'Atualizar o cofre?')
      await vaultsRepository.update(vault)
      navigation.navigate(ROUTES.vaultItens)
    } catch (error) {}
  }

  useEffect(() => {
    async function loadVault() {
      if (vault) return
      const loadedVault = await vaultsRepository.findById(vaultId ?? Id.create())
      setVault(loadedVault)
    }
    loadVault()
  }, [vaultId, vaultsRepository.findById])

  return {
    vault,
    handleVaultCreate,
    handleVaultUpdate,
  }
}
