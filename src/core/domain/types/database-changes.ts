import type { AccountDto, CredentialDto, CredentialVersionDto, VaultDto } from '../entities/dtos'

export type DatabaseChanges = {
  createdAccounts?: AccountDto[]
  updatedAccounts?: AccountDto[]
  deletedAccountsIds?: string[]
  createdVaults?: VaultDto[]
  updatedVaults?: VaultDto[]
  deletedVaultsIds?: string[]
  createdCredentials?: CredentialDto[]
  updatedCredentials?: CredentialDto[]
  deletedCredentialsIds?: string[]
  createdCredentialVersions?: CredentialVersionDto[]
  updatedCredentialVersions?: CredentialVersionDto[]
  deletedCredentialVersionsIds?: string[]
}
