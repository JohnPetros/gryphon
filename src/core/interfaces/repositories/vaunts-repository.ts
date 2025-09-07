import type { Id } from '@/core/domain/structures'
import type { Vaunt } from '../../domain/entities/vaunt'

export interface VauntsRepository {
  add(vaunt: Vaunt, accountId: Id): Promise<void>
  update(vaunt: Vaunt): Promise<void>
  findById(id: Id): Promise<Vaunt | null>
  findAllByAccount(accountId: Id): Promise<Vaunt[]>
}
