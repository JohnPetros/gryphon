import type { Id } from '@/core/domain/structures'
import type { Vault } from '../../domain/entities/vault'

export interface VaultsRepository {
  add(vault: Vault, accountId: Id): Promise<void>
  update(vaultId: Vault): Promise<void>
  findById(vaultId: Id): Promise<Vault | null>
  findAllByAccount(accountId: Id): Promise<Vault[]>
  remove(vaultId: Id): Promise<void>
}
