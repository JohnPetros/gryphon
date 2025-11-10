import type { Account } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'

export interface AccountsRepository {
  add(account: Account): Promise<void>
  addMany(accounts: Account[]): Promise<void>
  update(account: Account): Promise<void>
  updateMany(accounts: Account[]): Promise<void>
  findById(accountId: Id): Promise<Account | null>
  findByEmail(email: string): Promise<Account | null>
  findByCredential(credentialId: Id): Promise<Account | null>
  updateMinimumPasswordStrength(
    minimumPasswordStrength: number,
    accountId: Id,
  ): Promise<void>
  updateIsMasterPasswordRequired(
    isMasterPasswordRequired: boolean,
    accountId: Id,
  ): Promise<void>
  updateAutoLockTimeout(autoLockTimeout: number, accountId: Id): Promise<void>
  remove(accountId: Id): Promise<void>
  removeMany(accountIds: Id[]): Promise<void>
}
