import { useEffect, useState } from 'react'

import type { Id } from '@/core/domain/structures'
import type { VauntsRepository } from '@/core/interfaces'
import type { Vaunt } from '@/core/domain/entities'

export const useVauntSelect = (vauntsRepository: VauntsRepository, accountId: Id) => {
  const [vaunts, setVaunts] = useState<Vaunt[]>([])

  useEffect(() => {
    async function loadVaunts() {
      const vaunts = await vauntsRepository.findAllByAccount(accountId)
      setVaunts(vaunts)
    }

    loadVaunts()
  }, [vauntsRepository, accountId])

  return {
    vaunts,
  }
}
