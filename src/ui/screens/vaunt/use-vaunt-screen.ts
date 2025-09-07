import type { Vaunt } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { VauntsRepository } from '@/core/interfaces'
import { useEffect, useState } from 'react'

type Params = {
  accountId?: Id
  vauntId?: Id
  vauntsRepository: VauntsRepository
}

export function useVauntScreen({ vauntsRepository, accountId, vauntId }: Params) {
  const [vaunt, setVaunt] = useState<Vaunt | null>(null)

  async function handleVauntCreate(vaunt: Vaunt) {
    if (!accountId) return
    await vauntsRepository.add(vaunt, accountId)
  }

  async function handleVauntUpdate(vaunt: Vaunt) {
    await vauntsRepository.update(vaunt)
  }

  useEffect(() => {
    if (vauntId) {
      vauntsRepository.findById(vauntId).then((vaunt) => {
        setVaunt(vaunt)
      })
    }
  }, [vauntId, vauntsRepository])

  return {
    vaunt,
    handleVauntCreate,
    handleVauntUpdate,
  }
}
