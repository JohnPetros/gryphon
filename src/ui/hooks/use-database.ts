import { useMemo } from 'react'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonCredentialVersionsRepository,
  WatermelonVaultsRepository,
} from '@/database/watermelon'

export function useDatabase() {
  return useMemo(() => {
    return {
      accountsRepository: WatermelonAccountsRepository(),
      credentialsRepository: WatermelonCredentialsRepository(),
      vaultsRepository: WatermelonVaultsRepository(),
      credentialVersionsRepository: WatermelonCredentialVersionsRepository(),
    }
  }, [])
}
