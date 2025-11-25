import { useCallback, useMemo } from 'react'
import { synchronize } from '@nozbe/watermelondb/sync'

import { AppError } from '@/core/domain/errors'
import type { DatabaseChanges } from '@/core/domain/types'

import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
  WatermelonCredentialVersionsRepository,
  WatermelonVaultsRepository,
  WatermelonNotesRepository,
} from '@/database/watermelon'
import type { WatermelonChanges } from '@/database/watermelon/types'
import { watermelon } from '@/database/watermelon/watermelon'
import {
  WatermelonAccountMapper,
  WatermelonCredentialMapper,
  WatermelonCredentialVersionMapper,
  WatermelonVaultMapper,
  WatermelonNoteMapper,
} from '@/database/watermelon/mappers'
import { useRest } from './use-rest'
import { useInternetContext } from './use-internet-context'
import {
  Account,
  Credential,
  CredentialVersion,
  Note,
  Vault,
} from '@/core/domain/entities'
import { useAuthContext } from './use-auth-context'
import { useSecureStorage } from './use-secure-storage'
import { STORAGE_KEYS } from '@/constants'
import { Id } from '@/core/domain/structures'

type PushChangesParams = {
  changes: WatermelonChanges
  lastPulledAt: number
}

export function useDatabase() {
  const { databaseService } = useRest()
  const { isOffline } = useInternetContext()
  const { updateAccount } = useAuthContext()
  const storageProvider = useSecureStorage()
  const repositories = useMemo(() => {
    return {
      accountsRepository: WatermelonAccountsRepository(false),
      credentialsRepository: WatermelonCredentialsRepository(false),
      vaultsRepository: WatermelonVaultsRepository(false),
      notesRepository: WatermelonNotesRepository(false),
      credentialVersionsRepository: WatermelonCredentialVersionsRepository(false),
    }
  }, [])

  async function getAccountId() {
    const accountId = await storageProvider.getItem(STORAGE_KEYS.accountId)
    if (!accountId) throw new AppError('Account required')
    return Id.create(accountId)
  }

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

  function getNoteChanges(changes: WatermelonChanges) {
    const noteMapper = WatermelonNoteMapper()
    const createdNotes = changes.notes?.created.map(noteMapper.toDto)
    const updatedNotes = changes.notes?.updated.map(noteMapper.toDto)
    const deletedNotesIds = changes.notes?.deleted

    return {
      createdNotes,
      updatedNotes,
      deletedNotesIds,
    }
  }

  function getDatabaseChanges(changes: WatermelonChanges) {
    return {
      ...getAccountChanges(changes),
      ...getVaultChanges(changes),
      ...getCredentialChanges(changes),
      ...getCredentialVersionChanges(changes),
      ...getNoteChanges(changes),
    }
  }

  const synchronizeDatabase = useCallback(async () => {
    await synchronize({
      database: watermelon,
      pushChanges: async ({ changes }: PushChangesParams) => {
        if (isOffline) throw new AppError('Internet connection required')
        await getAccountId()
        await getAccountId()

        const databaseChanges = getDatabaseChanges(changes)
        const response = await databaseService.pushDatabaseChanges(databaseChanges)

        if (response.isFailure) {
          response.throwError()
        }
      },
      pullChanges: async ({ lastPulledAt }) => {
        if (isOffline) throw new AppError('Internet connection required')
        const accountId = await getAccountId()

        const response = await databaseService.pullDatabaseChanges(
          accountId,
          lastPulledAt ? new Date(lastPulledAt) : new Date(),
        )
        if (response.isFailure) response.throwError()

        return {
          changes: [],
          timestamp: Date.now(),
        }
      },
    })
  }, [isOffline])

  const pullAllDatabaseChanges = useCallback(async () => {
    if (isOffline) throw new AppError('Internet connection required')
    const accountId = await getAccountId()

    const response = await databaseService.pullDatabaseChanges(accountId)
    if (response.isFailure) response.throwError()

    await applyChanges(response.body, true)
  }, [])

  const applyChanges = useCallback(
    async (databaseChanges: DatabaseChanges, isSynced: boolean) => {
      if (isOffline) throw new AppError('Internet connection required')
      if (!databaseChanges.createdAccounts) return
      const accountId = await getAccountId()

      const accountsRepository = WatermelonAccountsRepository(true)
      const credentialsRepository = WatermelonCredentialsRepository(true)
      const vaultsRepository = WatermelonVaultsRepository(true)
      const notesRepository = WatermelonNotesRepository(true)
      const credentialVersionsRepository = WatermelonCredentialVersionsRepository(true)

      let account = await accountsRepository.findById(accountId)
      const createdAccount = databaseChanges.createdAccounts[0]
      if (!account && createdAccount) {
        account = await accountsRepository.findById(accountId)
        await accountsRepository.add(Account.create(databaseChanges.createdAccounts[0]))
        account = await accountsRepository.findById(accountId)
      } else {
        await accountsRepository.remove(accountId)
      }

      if (databaseChanges.createdVaults?.length) {
        await vaultsRepository.removeManyByAccount(accountId)
        await vaultsRepository.addMany(databaseChanges.createdVaults.map(Vault.create))
      }
      if (databaseChanges.createdCredentials?.length) {
        await credentialsRepository.removeManyByAccount(accountId)
        await credentialsRepository.addMany(
          databaseChanges.createdCredentials.map(Credential.create),
        )
      }
      if (databaseChanges.createdCredentialVersions?.length) {
        await credentialVersionsRepository.removeManyByAccount(accountId)
        await credentialVersionsRepository.addMany(
          databaseChanges.createdCredentialVersions.map(CredentialVersion.create),
        )
      }
      if (databaseChanges.createdNotes?.length) {
        await notesRepository.removeManyByAccount(accountId)
        await notesRepository.addMany(databaseChanges.createdNotes.map(Note.create))
      }

      if (account) updateAccount(account)

      if (!isSynced) {
        await databaseService.resetDatabase(accountId)
        await databaseService.pushDatabaseChanges(databaseChanges)
      }
    },
    [isOffline, databaseService, synchronizeDatabase],
  )

  return {
    ...repositories,
    synchronizeDatabase,
    pullAllDatabaseChanges,
    applyChanges,
  }
}
