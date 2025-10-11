import type { CredentialDto } from '../entities/dtos'

export type DatabaseChanges = {
  createdCredentials: CredentialDto[]
  updatedCredentials: CredentialDto[]
  deletedCredentialsIds: string[]
}
