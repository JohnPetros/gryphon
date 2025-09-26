import type { Id } from '@/core/domain/structures'
import type { Credential } from '../../domain/entities/credential'

export interface CredentialsRepository {
  add(credential: Credential): Promise<void>
  update(credential: Credential): Promise<void>
  findById(id: Id): Promise<Credential | null>
  findAllByVaultAndTitle(vaultId: Id, title: string): Promise<Credential[]>
  countByVault(vaultId: Id): Promise<number>
  remove(credentialId: Id): Promise<void>
}
