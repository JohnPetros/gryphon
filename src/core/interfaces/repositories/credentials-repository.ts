import type { Id } from '@/core/domain/structures'
import type { Credential } from '../../domain/entities/credential'

export interface CredentialsRepository {
  add(credential: Credential): Promise<void>
  addMany(credentials: Credential[]): Promise<void>
  update(credential: Credential): Promise<void>
  updateMany(credentials: Credential[]): Promise<void>
  findAllByAccount(accountId: Id): Promise<Credential[]>
  findById(id: Id): Promise<Credential | null>
  findAll(): Promise<Credential[]>
  findAllByVaultAndTitleAndLessThanUpdatingDate(
    vaultId: Id,
    title: string,
    updatedAt?: Date,
  ): Promise<Credential[]>
  countByVault(vaultId: Id): Promise<number>
  countAllLessThanUpdatingDateByAccount(accountId: Id, updatedAt: Date): Promise<number>
  remove(credentialId: Id): Promise<void>
  removeMany(credentialIds: Id[]): Promise<void>
  removeManyByAccount(accountId: Id): Promise<void>
}
