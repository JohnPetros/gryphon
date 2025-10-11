import { useCallback, useEffect, useMemo } from 'react'
import { synchronize } from '@nozbe/watermelondb/sync'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonCredentialVersionsRepository,
  WatermelonVaultsRepository,
} from '@/database/watermelon'
import type { WatermelonChanges } from '@/database/watermelon/types'
import { watermelon } from '@/database/watermelon/watermelon'
import { WatermelonCredentialMapper } from '@/database/watermelon/mappers'
import { useRest } from './use-rest'

type PushChangesParams = {
  changes: WatermelonChanges
  lastPulledAt: number
}

export function useDatabase() {
  const { databaseService } = useRest()

  const synchronizeDatabase = useCallback(async () => {
    await synchronize({
      database: watermelon,
      pushChanges: async ({ changes }: PushChangesParams) => {
        const credentialMapper = WatermelonCredentialMapper()
        const createdCredentials = changes.credentials?.created.map(
          credentialMapper.toDto,
        )
        const updatedCredentials = changes.credentials?.updated.map(
          credentialMapper.toDto,
        )
        const deletedCredentialsIds = changes.credentials?.deleted

        await databaseService.pushDatabaseChanges({
          createdCredentials,
          updatedCredentials,
          deletedCredentialsIds,
        })
      },
      pullChanges: async ({ lastPulledAt }) => {
        const response = await databaseService.pullDatabaseChanges(
          lastPulledAt ? new Date(lastPulledAt) : new Date(),
        )
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

  return {
    ...repositories,
    synchronizeDatabase,
  }
}
