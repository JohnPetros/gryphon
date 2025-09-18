import type { Id } from '@/core/domain/structures'
import type { Vault } from '../../domain/entities/vault'

export interface VaultsRepository {
  add(vault: Vault, accountId: Id): Promise<void>
  update(vault: Vault): Promise<void>
  findById(id: Id): Promise<Vault | null>
  findAllByAccount(accountId: Id): Promise<Vault[]>
}
