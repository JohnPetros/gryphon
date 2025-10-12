import { useCallback, useMemo } from 'react'
import { synchronize } from '@nozbe/watermelondb/sync'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonCredentialVersionsRepository,
  WatermelonVaultsRepository,
} from '@/database/watermelon'
import type { WatermelonChanges } from '@/database/watermelon/types'
import { watermelon } from '@/database/watermelon/watermelon'
import {
  WatermelonAccountMapper,
  WatermelonCredentialMapper,
  WatermelonCredentialVersionMapper,
  WatermelonVaultMapper,
} from '@/database/watermelon/mappers'
import { useRest } from './use-rest'
import { useInternetContext } from './use-internet-context'
import { AppError } from '@/core/domain/errors'

type PushChangesParams = {
  changes: WatermelonChanges
  lastPulledAt: number
}

export function useDatabase() {
  const { databaseService } = useRest()
  const { isOffline } = useInternetContext()

  function getAccountChanges(changes: WatermelonChanges) {
    const accountMapper = WatermelonAccountMapper()
    const createdAccounts = changes.accounts?.created.map(accountMapper.toDto)
    const updatedAccounts = changes.accounts?.updated.map(accountMapper.toDto)
    const deletedAccountsIds = changes.accounts?.deleted

    return {
      createdAccounts,
      updatedAccounts,
      deletedAccountsIds,
    }
  }

  function getVaultChanges(changes: WatermelonChanges) {
    const vaultMapper = WatermelonVaultMapper()
    const createdVaults = changes.vaults?.created.map(vaultMapper.toDto)
    const updatedVaults = changes.vaults?.updated.map(vaultMapper.toDto)
    const deletedVaultsIds = changes.vaults?.deleted

    return {
      createdVaults,
      updatedVaults,
      deletedVaultsIds,
    }
  }

  function getCredentialChanges(changes: WatermelonChanges) {
    const credentialMapper = WatermelonCredentialMapper()
    const createdCredentials = changes.credentials?.created.map(credentialMapper.toDto)
    const updatedCredentials = changes.credentials?.updated.map(credentialMapper.toDto)
    const deletedCredentialsIds = changes.credentials?.deleted

    return {
      createdCredentials,
      updatedCredentials,
      deletedCredentialsIds,
    }
  }

  function getCredentialVersionChanges(changes: WatermelonChanges) {
    const credentialVersionMapper = WatermelonCredentialVersionMapper()
    const createdCredentialVersions = changes.credential_versions?.created.map(
      credentialVersionMapper.toDto,
    )
    const updatedCredentialVersions = changes.credential_versions?.updated.map(
      credentialVersionMapper.toDto,
    )
    const deletedCredentialVersionsIds = changes.credential_versions?.deleted

    return {
      createdCredentialVersions,
      updatedCredentialVersions,
      deletedCredentialVersionsIds,
    }
  }

  const synchronizeDatabase = useCallback(async () => {
    await synchronize({
      database: watermelon,
      pushChanges: async ({ changes }: PushChangesParams) => {
        console.log(changes.credentials)

        if (isOffline) throw new AppError('Internet connection required')

        const response = await databaseService.pushDatabaseChanges({
          ...getAccountChanges(changes),
          ...getVaultChanges(changes),
          ...getCredentialChanges(changes),
          ...getCredentialVersionChanges(changes),
        })

        if (response.isFailure) {
          response.throwError()
        }
      },
      pullChanges: async ({ lastPulledAt }) => {
        if (isOffline) throw new AppError('Internet connection required')

        const response = await databaseService.pullDatabaseChanges(
          lastPulledAt ? new Date(lastPulledAt) : new Date(),
        )

        if (response.isFailure) {
          response.throwError()
        }

        return {
          changes: [],
          timestamp: Date.now(),
        }
      },
    })
  }, [isOffline])

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
