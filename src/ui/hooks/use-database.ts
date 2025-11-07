import { useCallback, useMemo } from 'react'
import { synchronize } from '@nozbe/watermelondb/sync'

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
import { AppError } from '@/core/domain/errors'
import { useAuth } from './use-auth'
import {
  Account,
  Credential,
  CredentialVersion,
  Note,
  Vault,
} from '@/core/domain/entities'
import { useAuthContext } from './use-auth-context'

type PushChangesParams = {
  changes: WatermelonChanges
  lastPulledAt: number
}

export function useDatabase() {
  const { databaseService } = useRest()
  const { isOffline } = useInternetContext()
  const { accountId } = useAuth()
  const { updateAccount } = useAuthContext()
  const repositories = useMemo(() => {
    return {
      accountsRepository: WatermelonAccountsRepository(false),
      credentialsRepository: WatermelonCredentialsRepository(false),
      vaultsRepository: WatermelonVaultsRepository(false),
      notesRepository: WatermelonNotesRepository(false),
      credentialVersionsRepository: WatermelonCredentialVersionsRepository(false),
    }
  }, [])

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

  const synchronizeDatabase = useCallback(async () => {
    await synchronize({
      database: watermelon,
      pushChanges: async ({ changes }: PushChangesParams) => {
        if (isOffline) throw new AppError('Internet connection required')

        const response = await databaseService.pushDatabaseChanges({
          ...getAccountChanges(changes),
          ...getVaultChanges(changes),
          ...getCredentialChanges(changes),
          ...getCredentialVersionChanges(changes),
          ...getNoteChanges(changes),
        })

        if (response.isFailure) {
          response.throwError()
        }
      },
      pullChanges: async ({ lastPulledAt }) => {
        if (!accountId) throw new AppError('Account required')
        if (isOffline) throw new AppError('Internet connection required')

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
  }, [isOffline, accountId])

  const pullAllDatabaseChanges = useCallback(async () => {
    if (!accountId) throw new AppError('Account required')
    if (isOffline) throw new AppError('Internet connection required')

    const accountsRepository = WatermelonAccountsRepository(true)
    const credentialsRepository = WatermelonCredentialsRepository(true)
    const vaultsRepository = WatermelonVaultsRepository(true)
    const notesRepository = WatermelonNotesRepository(true)
    const credentialVersionsRepository = WatermelonCredentialVersionsRepository(true)

    const response = await databaseService.pullDatabaseChanges(accountId)
    if (response.isFailure) response.throwError()

    if (!response.body.createdAccounts) return

    let account = await accountsRepository.findById(accountId)
    const createdAccount = response.body.createdAccounts[0]
    if (!account && createdAccount) {
      await accountsRepository.add(Account.create(response.body.createdAccounts[0]))
      account = await accountsRepository.findById(accountId)
    } else {
      await accountsRepository.remove(accountId)
    }

    if (response.body.createdVaults?.length) {
      await vaultsRepository.removeManyByAccount(accountId)
      await vaultsRepository.addMany(response.body.createdVaults.map(Vault.create))
    }
    if (response.body.createdCredentials?.length) {
      await credentialsRepository.removeManyByAccount(accountId)
      await credentialsRepository.addMany(
        response.body.createdCredentials.map(Credential.create),
      )
    }
    if (response.body.createdCredentialVersions?.length) {
      await credentialVersionsRepository.removeManyByAccount(accountId)
      await credentialVersionsRepository.addMany(
        response.body.createdCredentialVersions.map(CredentialVersion.create),
      )
    }
    if (response.body.createdNotes?.length) {
      await notesRepository.removeManyByAccount(accountId)
      await notesRepository.addMany(response.body.createdNotes.map(Note.create))
    }

    if (account) updateAccount(account)
  }, [accountId, isOffline, repositories, databaseService.pullDatabaseChanges])

  return {
    ...repositories,
    synchronizeDatabase,
    pullAllDatabaseChanges,
  }
}
