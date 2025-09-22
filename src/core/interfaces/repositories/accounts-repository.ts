import type { Account } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'

export interface AccountsRepository {
  add(account: Account): Promise<void>
  findById(id: Id): Promise<Account | null>
  findByEmail(email: string): Promise<Account | null>
  updateMinimumPasswordStrength(
    minimumPasswordStrength: number,
    accountId: Id,
  ): Promise<void>
  updateIsMasterPasswordRequired(
    isMasterPasswordRequired: boolean,
    accountId: Id,
  ): Promise<void>
  updateAutoLockTimeout(autoLockTimeout: number, accountId: Id): Promise<void>
}
