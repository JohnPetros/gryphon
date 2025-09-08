import type { vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { vaultsRepository } from '@/core/interfaces'
import { useEffect, useState } from 'react'

type Params = {
  accountId?: Id
  vaultId?: Id
  vaultsRepository: vaultsRepository
}

export function usevaultScreen({ vaultsRepository, accountId, vaultId }: Params) {
  const [vault, setvault] = useState<vault | null>(null)

  async function handlevaultCreate(vault: vault) {
    if (!accountId) return
    await vaultsRepository.add(vault, accountId)
  }

  async function handlevaultUpdate(vault: vault) {
    await vaultsRepository.update(vault)
  }

  useEffect(() => {
    if (vaultId) {
      vaultsRepository.findById(vaultId).then((vault) => {
        setvault(vault)
      })
    }
  }, [vaultId, vaultsRepository])

  return {
    vault,
    handlevaultCreate,
    handlevaultUpdate,
  }
}
