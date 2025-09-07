import { useMemo } from 'react'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonVauntsRepository,
} from '@/database/watermelon'

export function useDatabase() {
  return useMemo(() => {
    return {
      accountsRepository: WatermelonAccountsRepository(),
      credentialsRepository: WatermelonCredentialsRepository(),
      vauntsRepository: WatermelonVauntsRepository(),
    }
  }, [])
}
