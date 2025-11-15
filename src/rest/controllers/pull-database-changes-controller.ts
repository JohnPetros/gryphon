import type { Controller } from '@/core/interfaces/controller'
import type { Http } from '@/core/interfaces/http'
import type {
  AccountsRepository,
  CredentialsRepository,
  CredentialVersionsRepository,
  NotesRepository,
  VaultsRepository,
} from '@/core/interfaces'
import { Id } from '@/core/domain/structures'

type Dependencies = {
  accountsRepository: AccountsRepository
  vaultsRepository: VaultsRepository
  credentialsRepository: CredentialsRepository
  credentialVersionRepository: CredentialVersionsRepository
  notesRepository: NotesRepository
}

type Schema = {
  queryParams: {
    accountId: string
    lastPulledAt?: Date
  }
}

export const PullDatabaseChangesController = ({
  accountsRepository,
  vaultsRepository,
  credentialsRepository,
  credentialVersionRepository,
  notesRepository,
}: Dependencies): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const request = http.getQueryParams()
      const accountId = Id.create(request.accountId)

      const account = await accountsRepository.findById(accountId)
      const vaults = await vaultsRepository.findAllByAccount(accountId)
      const credentials = await credentialsRepository.findAllByAccount(accountId)
      const credentialVersions =
        await credentialVersionRepository.findAllByAccount(accountId)
      const notes = await notesRepository.findAllByAccount(accountId)

      return http.send({
        createdAccounts: [account?.dto],
        updatedAccounts: [],
        deletedAccountsIds: [],
        createdVaults: vaults.map((vault) => vault.dto),
        updatedVaults: [],
        deletedVaultsIds: [],
        createdCredentials: credentials.map((credential) => credential.dto),
        updatedCredentials: [],
        deletedCredentialsIds: [],
        createdCredentialVersions: credentialVersions.map(
          (credentialVersion) => credentialVersion.dto,
        ),
        updatedCredentialVersions: [],
        deletedCredentialVersionsIds: [],
        createdNotes: notes.map((note) => note.dto),
        updatedNotes: [],
        deletedNotesIds: [],
      })
    },
  }
}
