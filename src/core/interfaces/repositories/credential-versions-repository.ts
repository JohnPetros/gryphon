import type { Id } from '@/core/domain/structures'
import type { CredentialVersion } from '@/core/domain/entities/credential-version'

export interface CredentialVersionsRepository {
  add(credentialVersion: CredentialVersion): Promise<void>
  addMany(credentialVersions: CredentialVersion[]): Promise<void>
  update(credentialVersion: CredentialVersion): Promise<void>
  updateMany(credentialVersions: CredentialVersion[]): Promise<void>
  findAllByAccount(accountId: Id): Promise<CredentialVersion[]>
  findLastByCredential(credentialId: Id): Promise<CredentialVersion | null>
  findAllByCredential(credentialId: Id): Promise<CredentialVersion[]>
  remove(credentialVersionId: Id): Promise<void>
  removeMany(credentialVersionIds: Id[]): Promise<void>
  removeManyByAccount(accountId: Id): Promise<void>
}
