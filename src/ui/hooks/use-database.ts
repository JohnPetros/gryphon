import { useMemo } from 'react'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonVaultsRepository,
} from '@/database/watermelon'

export function useDatabase() {
  return useMemo(() => {
    return {
      accountsRepository: WatermelonAccountsRepository(),
      credentialsRepository: WatermelonCredentialsRepository(),
      vaultsRepository: WatermelonVaultsRepository(),
    }
  }, [])
}
