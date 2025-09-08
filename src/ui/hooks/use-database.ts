import { useMemo } from 'react'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonvaultsRepository,
} from '@/database/watermelon'

export function useDatabase() {
  return useMemo(() => {
    return {
      accountsRepository: WatermelonAccountsRepository(),
      credentialsRepository: WatermelonCredentialsRepository(),
      vaultsRepository: WatermelonvaultsRepository(),
    }
  }, [])
}
