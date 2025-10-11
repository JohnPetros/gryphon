import type { Id } from '@/core/domain/structures'
import type { Vault } from '../../domain/entities/vault'

export interface VaultsRepository {
  add(vault: Vault): Promise<void>
  addMany(vaults: Vault[]): Promise<void>
  update(vault: Vault): Promise<void>
  updateMany(vaults: Vault[]): Promise<void>
  findById(vaultId: Id): Promise<Vault | null>
  findAllByAccount(accountId: Id): Promise<Vault[]>
  remove(vaultId: Id): Promise<void>
  removeMany(vaultIds: Id[]): Promise<void>
}
