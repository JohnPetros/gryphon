import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import type { AccountsRepository } from '@/core/interfaces'
import type { Account } from '@/core/domain/entities/account'
import type { Id } from '@/core/domain/structures'

import type { AccountModel } from '../models'
import { WatermelonAccountMapper } from '../mappers'
import { watermelon } from '../client'

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
              encryptionSalt: account.encryptionSalt,
              isBiometryActivated: account.isBiometryActivated,
              minimumPasswordStrength: account.minimumPasswordStrength,
              minimumAppLockTimeInSeconds: account.minimumAppLockTimeInSeconds,
              isMasterPasswordRequired: account.isMasterPasswordRequired,
            },
            accountsCollection.schema,
          )
        })
      })
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
  }
}
