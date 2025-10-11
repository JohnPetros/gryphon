import { useCallback, useEffect, useMemo } from 'react'
import { synchronize } from '@nozbe/watermelondb/sync'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonCredentialVersionsRepository,
  WatermelonVaultsRepository,
} from '@/database/watermelon'
import { watermelon } from '@/database/watermelon/watermelon'
import { useRest } from './use-rest'

export function useDatabase() {
  const { databaseService } = useRest()

  const synchronizeDatabase = useCallback(async () => {
    await synchronize({
      database: watermelon,
      pushChanges: async ({ changes, lastPulledAt }) => {},
      pullChanges: async ({ lastPulledAt }) => {
        const response = await databaseService.pullDatabaseChanges(
          lastPulledAt ? new Date(lastPulledAt) : new Date(),
        )
        console.log('response', response)
        return {
          changes: [],
          timestamp: Date.now(),
        }
      },
    })
  }, [])

  const repositories = useMemo(() => {
    return {
      accountsRepository: WatermelonAccountsRepository(),
      credentialsRepository: WatermelonCredentialsRepository(),
      vaultsRepository: WatermelonVaultsRepository(),
      credentialVersionsRepository: WatermelonCredentialVersionsRepository(),
    }
  }, [])

  useEffect(() => {
    synchronizeDatabase()
  }, [synchronizeDatabase])

  return {
    ...repositories,
    synchronizeDatabase,
  }
}
