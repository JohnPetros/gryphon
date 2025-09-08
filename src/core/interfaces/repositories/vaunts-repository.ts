import type { Id } from '@/core/domain/structures'
import type { vault } from '../../domain/entities/vault'

export interface vaultsRepository {
  add(vault: vault, accountId: Id): Promise<void>
  update(vault: vault): Promise<void>
  findById(id: Id): Promise<vault | null>
  findAllByAccount(accountId: Id): Promise<vault[]>
}
