import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
import { Q } from '@nozbe/watermelondb'

import type { AccountsRepository } from '@/core/interfaces'
import type { Account } from '@/core/domain/entities/account'
import type { Id } from '@/core/domain/structures'

import type { AccountModel } from '../models'
import { WatermelonAccountMapper } from '../mappers'
import { watermelon } from '../watermelon'

export const WatermelonAccountsRepository = (): AccountsRepository => {
  const mapper = WatermelonAccountMapper()

  return {
    async add(account: Account): Promise<void> {
      await watermelon.write(async () => {
        const accountsCollection = watermelon.collections.get<AccountModel>('accounts')
        await accountsCollection.create((model) => {
          model._raw = sanitizedRaw(
            {
              id: account.id.value,
              email: account.email,
              encryption_salt: account.encryptionSalt,
              is_biometry_activated: account.isBiometryActivated,
              minimum_password_strength: account.minimumPasswordStrength,
              auto_lock_timeout: account.autoLockTimeout,
              is_master_password_required: account.isMasterPasswordRequired,
            },
            accountsCollection.schema,
          )
        })
      })
    },

    async addMany(accounts: Account[]): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async findByEmail(email: string): Promise<Account | null> {
      const accountModel = await watermelon.collections
        .get<AccountModel>('accounts')
        .query(Q.where('email', email))
        .fetch()

      return mapper.toEntity(accountModel[0])
    },

    async findById(id: Id): Promise<Account | null> {
      try {
        const accountModel = await watermelon.collections
          .get<AccountModel>('accounts')
          .find(id.value)

        return mapper.toEntity(accountModel)
      } catch (error) {
        console.error(error)
        return null
      }
    },

    async updateMinimumPasswordStrength(
      minimumPasswordStrength: number,
      accountId: Id,
    ): Promise<void> {
      await watermelon.write(async () => {
        const accountModel = await watermelon.collections
          .get<AccountModel>('accounts')
          .find(accountId.value)

        await accountModel.update((model) => {
          model.minimumPasswordStrength = minimumPasswordStrength
        })
      })
    },

    async updateIsMasterPasswordRequired(
      isMasterPasswordRequired: boolean,
      accountId: Id,
    ): Promise<void> {
      await watermelon.write(async () => {
        const accountModel = await watermelon.collections
          .get<AccountModel>('accounts')
          .find(accountId.value)

        await accountModel.update((model) => {
          model.isMasterPasswordRequired = isMasterPasswordRequired
        })
      })
    },

    async updateAutoLockTimeout(autoLockTimeout: number, accountId: Id): Promise<void> {
      await watermelon.write(async () => {
        const accountModel = await watermelon.collections
          .get<AccountModel>('accounts')
          .find(accountId.value)

        await accountModel.update((model) => {
          model.autoLockTimeout = autoLockTimeout
        })
      })
    },

    async update(accounts: Account): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async updateMany(accounts: Account[]): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async removeMany(accountIds: Id[]): Promise<void> {
      throw new Error('Method not implemented.')
    },

    async remove(accountId: Id): Promise<void> {
      throw new Error('Method not implemented.')
    },
  }
}
