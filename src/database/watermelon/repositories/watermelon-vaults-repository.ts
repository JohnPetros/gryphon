import { Q } from '@nozbe/watermelondb'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import type { VaultsRepository } from '@/core/interfaces'
import type { Vault } from '@/core/domain/entities/vault'
import type { Id } from '@/core/domain/structures'

import type { VaultModel } from '../models'
import { WatermelonVaultMapper } from '../mappers'
import { watermelon } from '../watermelon'

export const WatermelonVaultsRepository = (): VaultsRepository => {
  const mapper = WatermelonVaultMapper()

  return {
    async add(vault: Vault): Promise<void> {
      try {
        await watermelon.write(async () => {
          const vaultsCollection = watermelon.collections.get<VaultModel>('vaults')
          await vaultsCollection.create((model) => {
            model._raw = sanitizedRaw(
              {
                id: vault.id.value,
                title: vault.title,
                icon: vault.icon,
                account_id: vault.accountId.value,
              },
              vaultsCollection.schema,
            )
          })
        })
      } catch (error) {
        console.error('Error adding vault', error)
      }
    },

    async addMany(vaults: Vault[]): Promise<void> {},

    async update(vault: Vault): Promise<void> {
      const model = await watermelon.collections
        .get<VaultModel>('vaults')
        .find(vault.id.value)

      await watermelon.write(async () => {
        await model.update((model) => {
          model.title = vault.title
          model.icon = vault.icon
        })
      })
    },

    async updateMany(vaults: Vault[]): Promise<void> {},

    async findById(id: Id): Promise<Vault | null> {
      try {
        const model = await watermelon.collections
          .get<VaultModel>('vaults')
          .find(id.value)

        return await mapper.toEntity(model)
      } catch {
        return null
      }
    },

    async findAllByAccount(accountId: Id): Promise<Vault[]> {
      try {
        const models = await watermelon.collections
          .get<VaultModel>('vaults')
          .query(Q.where('account_id', accountId.value))
          .fetch()

        return await Promise.all(models.map(mapper.toEntity))
      } catch (error) {
        console.error(error)
        return []
      }
    },

    async remove(vaultId: Id): Promise<void> {
      await watermelon.write(async () => {
        const model = await watermelon.collections
          .get<VaultModel>('vaults')
          .find(vaultId.value)

        await model.markAsDeleted()
      })
    },

    async removeMany(vaultIds: Id[]): Promise<void> {
      throw new Error('Method not implemented.')
    },
  }
}
