import { Account, Credential, CredentialVersion, Vault } from '@/core/domain/entities'
import { Id } from '@/core/domain/structures'
import type {
  AccountDto,
  CredentialDto,
  CredentialVersionDto,
  VaultDto,
} from '@/core/domain/entities/dtos'
import type {
  AccountsRepository,
  CredentialsRepository,
  CredentialVersionsRepository,
  VaultsRepository,
} from '@/core/interfaces'
import type { Controller } from '@/core/interfaces/controller'
import type { Http } from '@/core/interfaces/http'

type Dependencies = {
  accountsRepository: AccountsRepository
  vaultsRepository: VaultsRepository
  credentialsRepository: CredentialsRepository
  credentialVersionRepository: CredentialVersionsRepository
}

type Schema = {
  body: {
    createdAccounts: AccountDto[]
    updatedAccounts: AccountDto[]
    deletedAccountsIds: string[]
    createdVaults: VaultDto[]
    updatedVaults: VaultDto[]
    deletedVaultsIds: string[]
    createdCredentials: CredentialDto[]
    updatedCredentials: CredentialDto[]
    deletedCredentialsIds: string[]
    createdCredentialVersions: CredentialVersionDto[]
    updatedCredentialVersions: CredentialVersionDto[]
    deletedCredentialVersionsIds: string[]
  }
}

export const PushDatabaseChangesController = ({
  accountsRepository,
  vaultsRepository,
  credentialsRepository,
  credentialVersionRepository,
}: Dependencies): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const {
        createdAccounts = [],
        updatedAccounts = [],
        deletedAccountsIds = [],
        createdVaults = [],
        updatedVaults = [],
        deletedVaultsIds = [],
        createdCredentials = [],
        updatedCredentials = [],
        deletedCredentialsIds = [],
        createdCredentialVersions = [],
        updatedCredentialVersions = [],
        deletedCredentialVersionsIds = [],
      } = await http.getBody()

      await Promise.all([
        accountsRepository.addMany(createdAccounts.map(Account.create)),
        accountsRepository.updateMany(updatedAccounts.map(Account.create)),
        accountsRepository.removeMany(deletedAccountsIds.map(Id.create)),
      ])

      await Promise.all([
        vaultsRepository.addMany(createdVaults.map(Vault.create)),
        vaultsRepository.updateMany(updatedVaults.map(Vault.create)),
        vaultsRepository.removeMany(deletedVaultsIds.map(Id.create)),
      ])

      await Promise.all([
        credentialsRepository.addMany(createdCredentials.map(Credential.create)),
        credentialsRepository.updateMany(updatedCredentials.map(Credential.create)),
        credentialsRepository.removeMany(deletedCredentialsIds.map(Id.create)),
      ])

      await Promise.all([
        credentialVersionRepository.addMany(
          createdCredentialVersions.map(CredentialVersion.create),
        ),
        credentialVersionRepository.updateMany(
          updatedCredentialVersions.map(CredentialVersion.create),
        ),
        credentialVersionRepository.removeMany(
          deletedCredentialVersionsIds.map(Id.create),
        ),
      ])

      return http.send({ message: 'Database synchronized!' })
    },
  }
}
