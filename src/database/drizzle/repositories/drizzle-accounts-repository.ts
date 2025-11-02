import { eq, inArray } from 'drizzle-orm'

import type { AccountsRepository } from '@/core/interfaces'
import type { Id } from '@/core/domain/structures'
import type { Account } from '@/core/domain/entities'

import { drizzle } from '../drizzle'
import { accountSchema } from '../schemas/account-schema'
import { DrizzleAccountMapper } from '../mappers/drizzle-account-mapper'

export const DrizzleAccountsRepository = (): AccountsRepository => {
  const mapper = DrizzleAccountMapper()

  return {
    async add(account: Account): Promise<void> {
      await drizzle.insert(accountSchema).values({
        id: account.id.value,
        email: account.email,
        encryptionSalt: account.encryptionSalt,
        kcv: account.kcv,
        isBiometryActivated: account.isBiometryActivated ? 1 : 0,
        minimumPasswordStrength: account.minimumPasswordStrength,
        autoLockTimeout: account.autoLockTimeout,
        isMasterPasswordRequired: account.isMasterPasswordRequired ? 1 : 0,
      })
    },

    async addMany(accounts: Account[]): Promise<void> {
      if (accounts.length === 0) return

      await drizzle.insert(accountSchema).values(
        accounts.map((account) => ({
          id: account.id.value,
          email: account.email,
          encryptionSalt: account.encryptionSalt,
          kcv: account.kcv,
          isBiometryActivated: account.isBiometryActivated ? 1 : 0,
          minimumPasswordStrength: account.minimumPasswordStrength,
          autoLockTimeout: account.autoLockTimeout,
          isMasterPasswordRequired: account.isMasterPasswordRequired ? 1 : 0,
        })),
      )
    },

    async update(account: Account): Promise<void> {
      await drizzle
        .update(accountSchema)
        .set({
          email: account.email,
          encryptionSalt: account.encryptionSalt,
          kcv: account.kcv,
          isBiometryActivated: account.isBiometryActivated ? 1 : 0,
          minimumPasswordStrength: account.minimumPasswordStrength,
          autoLockTimeout: account.autoLockTimeout,
          isMasterPasswordRequired: account.isMasterPasswordRequired ? 1 : 0,
        })
        .where(eq(accountSchema.id, account.id.value))
    },

    async updateMany(accounts: Account[]): Promise<void> {
      if (accounts.length === 0) return

      await Promise.all(
        accounts.map((account) =>
          drizzle
            .update(accountSchema)
            .set({
              email: account.email,
              encryptionSalt: account.encryptionSalt,
              kcv: account.kcv,
              isBiometryActivated: account.isBiometryActivated ? 1 : 0,
              minimumPasswordStrength: account.minimumPasswordStrength,
              autoLockTimeout: account.autoLockTimeout,
              isMasterPasswordRequired: account.isMasterPasswordRequired ? 1 : 0,
            })
            .where(eq(accountSchema.id, account.id.value)),
        ),
      )
    },

    async findById(id: Id): Promise<Account | null> {
      const result = await drizzle
        .select()
        .from(accountSchema)
        .where(eq(accountSchema.id, id.value))
        .limit(1)

      if (result.length === 0) {
        return null
      }

      return mapper.toEntity(result[0])
    },

    async findByEmail(email: string): Promise<Account | null> {
      const result = await drizzle
        .select()
        .from(accountSchema)
        .where(eq(accountSchema.email, email))
        .limit(1)

      if (result.length === 0) {
        return null
      }

      return mapper.toEntity(result[0])
    },

    async updateMinimumPasswordStrength(
      minimumPasswordStrength: number,
      accountId: Id,
    ): Promise<void> {
      await drizzle
        .update(accountSchema)
        .set({ minimumPasswordStrength })
        .where(eq(accountSchema.id, accountId.value))
    },

    async updateIsMasterPasswordRequired(
      isMasterPasswordRequired: boolean,
      accountId: Id,
    ): Promise<void> {
      await drizzle
        .update(accountSchema)
        .set({ isMasterPasswordRequired: isMasterPasswordRequired ? 1 : 0 })
        .where(eq(accountSchema.id, accountId.value))
    },

    async updateAutoLockTimeout(autoLockTimeout: number, accountId: Id): Promise<void> {
      await drizzle
        .update(accountSchema)
        .set({ autoLockTimeout })
        .where(eq(accountSchema.id, accountId.value))
    },

    async remove(accountId: Id): Promise<void> {
      await drizzle.delete(accountSchema).where(eq(accountSchema.id, accountId.value))
    },

    async removeMany(accountIds: Id[]): Promise<void> {
      if (accountIds.length === 0) return

      await drizzle.delete(accountSchema).where(
        inArray(
          accountSchema.id,
          accountIds.map((id) => id.value),
        ),
      )
    },
  }
}
