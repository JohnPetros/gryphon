import { useMemo } from 'react'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonVaultsRepository,
} from '@/database/watermelon'

export function useDatabase() {
  return {
    accountsRepository: WatermelonAccountsRepository(),
    credentialsRepository: WatermelonCredentialsRepository(),
    vaultsRepository: WatermelonVaultsRepository(),
  }
}
