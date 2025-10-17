import type { Id } from '@/core/domain/structures'
import type { CredentialVersion } from '@/core/domain/entities/credential-version'

export interface CredentialVersionsRepository {
  add(credentialVersion: CredentialVersion): Promise<void>
  findLastByCredential(credentialId: Id): Promise<CredentialVersion | null>
  findAllByCredential(credentialId: Id): Promise<CredentialVersion[]>
}
