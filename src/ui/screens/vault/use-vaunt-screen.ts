import { useEffect, useState } from 'react'

<<<<<<< HEAD
import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { ROUTES } from '@/constants/routes'
import { useNavigation } from '@/ui/hooks/use-navigation'
=======
import { Id } from '@/core/domain/structures'
import type { VaultsRepository } from '@/core/interfaces'
import { Vault } from '@/core/domain/entities'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { ROUTES } from '@/constants'
import { Alert } from 'react-native'
import { VaultDto } from '@/core/domain/entities/dtos'
>>>>>>> vault-screen

type Params = {
  accountId?: Id
  vaultId?: Id
  vaultsRepository: VaultsRepository
}

export function useVaultScreen({ vaultsRepository, accountId, vaultId }: Params) {
  const [vault, setVault] = useState<Vault | null>(null)
  const navigation = useNavigation()

  async function handleVaultCreate(vaultDto: VaultDto) {
    if (!accountId) return
    const vault = Vault.create(vaultDto)
    await vaultsRepository.add(vault, accountId)
<<<<<<< HEAD
    navigation.navigate(ROUTES.vault.itens(vault.id.value))
=======
    setVault(vault)
    navigation.navigate(ROUTES.vaultItens)
>>>>>>> vault-screen
  }

  async function handleVaultUpdate(vaultDto: VaultDto) {
    try {
      if (!vaultId) return
      const vault = Vault.create({
        ...vaultDto,
        id: vaultId.value,
      })
      await vaultsRepository.update(vault)
      navigation.navigate(ROUTES.vaultItens)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
<<<<<<< HEAD
    async function fetchVault() {
      if (!vaultId) return

      const vault = await vaultsRepository.findById(vaultId)
      if (!vault) throw new Error('Vault not found')
      setVault(vault)
    }

    fetchVault()
=======
    async function loadVault() {
      if (vault) return
      const loadedVault = await vaultsRepository.findById(vaultId ?? Id.create())
      setVault(loadedVault)
    }
    loadVault()
>>>>>>> vault-screen
  }, [vaultId, vaultsRepository.findById])

  return {
    vault,
    handleVaultCreate,
    handleVaultUpdate,
  }
}
